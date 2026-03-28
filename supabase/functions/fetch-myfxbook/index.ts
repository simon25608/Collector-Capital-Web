import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Esta es una Edge Function de Supabase escrita en Deno.
// Se ejecuta mediante un Cron Job cada 6 horas.

serve(async (req) => {
  try {
    // 1. Obtener credenciales del entorno
    const myfxbookEmail = Deno.env.get('MYFXBOOK_EMAIL');
    const myfxbookPassword = Deno.env.get('MYFXBOOK_PASSWORD');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!myfxbookEmail || !myfxbookPassword || !supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing environment variables');
    }

    // 2. Inicializar cliente de Supabase con Service Role (bypasses RLS)
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 3. Login en Myfxbook API
    const loginResponse = await fetch(`https://www.myfxbook.com/api/login.json?email=${encodeURIComponent(myfxbookEmail)}&password=${encodeURIComponent(myfxbookPassword)}`);
    const loginData = await loginResponse.json();

    if (loginData.error) {
      throw new Error(`Myfxbook login failed: ${loginData.message}`);
    }

    const session = loginData.session;

    // 4. Obtener estrategias (sistemas)
    // Nota: La API de Myfxbook requiere el session ID. Ajusta el endpoint según la documentación exacta que necesites (ej. get-my-accounts o get-community-systems)
    const systemsResponse = await fetch(`https://www.myfxbook.com/api/get-my-accounts.json?session=${session}`);
    const systemsData = await systemsResponse.json();

    if (systemsData.error) {
      throw new Error(`Failed to fetch systems: ${systemsData.message}`);
    }

    // 5. Transformar y guardar en Supabase
    // Aquí mapeamos la respuesta de Myfxbook a nuestro esquema de base de datos
    const accounts = systemsData.accounts || [];
    
    for (const account of accounts) {
      const strategyData = {
        name: account.name,
        monthly_return: account.monthly || 0,
        win_rate: account.winRatio || 0,
        drawdown: account.drawdown || 0,
        profit_factor: account.profitFactor || 0,
        investors: account.subscribers || 0,
        aum: account.balance ? `$${(account.balance / 1000000).toFixed(1)}M` : '$0M',
        // Aquí podrías hacer fetch adicional para el chart_data si la API lo permite
        chart_data: JSON.stringify([
          { month: 'Jan', return: 2.4 },
          { month: 'Feb', return: 3.1 },
          { month: 'Mar', return: 1.8 }
        ])
      };

      // Upsert basado en el nombre (o ID si lo tuvieras)
      const { error: dbError } = await supabase
        .from('trading_strategies')
        .upsert(strategyData, { onConflict: 'name' });

      if (dbError) {
        console.error(`Error saving strategy ${account.name}:`, dbError);
      }
    }

    // 6. Logout de Myfxbook (buena práctica)
    await fetch(`https://www.myfxbook.com/api/logout.json?session=${session}`);

    return new Response(
      JSON.stringify({ success: true, message: `Processed ${accounts.length} strategies` }),
      { headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
})

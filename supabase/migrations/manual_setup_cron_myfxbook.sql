-- ============================================================
-- Configuración del cron para sincronización con MyFXBook
-- Ejecutar manualmente en: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Habilitar extensiones necesarias
--    pg_cron:  permite programar tareas periódicas en PostgreSQL
--    pg_net:   permite realizar peticiones HTTP desde PostgreSQL
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2. Programar la Edge Function 'bright-handler' cada 6 horas
--    Esta función consulta la API de MyFXBook y actualiza la
--    tabla de estrategias en Supabase.
--
--    Reemplaza YOUR_SERVICE_ROLE_KEY con tu clave de servicio
--    (Supabase Dashboard → Settings → API → service_role key)
SELECT
  cron.schedule(
    'sync-myfxbook-every-6-hours',      -- nombre único del job
    '0 */6 * * *',                       -- cada 6 horas (en el minuto 0)
    $$
    SELECT
      net.http_post(
        url:='https://lgzgmkbvsgmahmhmidth.supabase.co/functions/v1/bright-handler',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb,
        body:='{}'::jsonb
      ) AS request_id;
    $$
  );

-- Para verificar que el job fue creado:
-- SELECT * FROM cron.job;

-- Para eliminar el job (si necesitas recrearlo):
-- SELECT cron.unschedule('sync-myfxbook-every-6-hours');

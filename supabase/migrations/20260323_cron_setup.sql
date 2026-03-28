-- Habilitar la extensión pg_cron (requiere permisos de superusuario en la base de datos)
-- Nota: En Supabase, esto se hace desde el Dashboard (Database -> Extensions) o mediante SQL
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Programar la ejecución de la Edge Function cada 6 horas
-- Reemplaza 'YOUR_PROJECT_REF' con el ID de tu proyecto de Supabase
-- Reemplaza 'YOUR_ANON_KEY' con tu clave anónima (o Service Role Key si prefieres)
SELECT cron.schedule(
    'fetch-myfxbook-every-6-hours', -- nombre del job
    '0 */6 * * *',                  -- cada 6 horas (minuto 0)
    $$
    SELECT
      net.http_post(
        url:='https://YOUR_PROJECT_REF.supabase.co/functions/v1/fetch-myfxbook',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb,
        body:='{}'::jsonb
      ) as request_id;
    $$
);

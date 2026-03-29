-- 1. Habilitar la extensión para hacer peticiones HTTP
create extension if not exists pg_net;

-- 2. Crear la tarea que ejecuta tu función "bright-handler" cada 6 horas
select
  cron.schedule(
    'sync-myfxbook-every-6-hours',
    '0 */6 * * *',
    $$
    select
      net.http_post(
          url:='https://lgzgmkbvsgmahmhmidth.supabase.co/functions/v1/bright-handler',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer TU_ANON_KEY"}'::jsonb,
          body:='{}'::jsonb
      ) as request_id;
    $$
  );

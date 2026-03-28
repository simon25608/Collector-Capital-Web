-- Migración inicial: Crear tabla de estrategias de trading y configurar RLS

-- 1. Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Crear la tabla principal (con UNIQUE en name para permitir upserts)
CREATE TABLE IF NOT EXISTS trading_strategies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    monthly_return NUMERIC NOT NULL,
    win_rate NUMERIC NOT NULL,
    drawdown NUMERIC NOT NULL,
    profit_factor NUMERIC NOT NULL,
    investors INTEGER NOT NULL,
    aum TEXT NOT NULL,
    chart_data JSONB NOT NULL DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE trading_strategies ENABLE ROW LEVEL SECURITY;

-- 4. Configurar Políticas de Seguridad
-- Borramos políticas anteriores por si acaso
DROP POLICY IF EXISTS "Allow read access to authenticated users" ON trading_strategies;
DROP POLICY IF EXISTS "Allow public read access" ON trading_strategies;
DROP POLICY IF EXISTS "Allow service role to manage strategies" ON trading_strategies;

-- Política: Lectura pública (Cualquiera puede ver las estrategias)
CREATE POLICY "Allow public read access" 
ON trading_strategies FOR SELECT TO anon, authenticated USING (true);

-- Política: Escritura solo para el sistema (Edge Function)
CREATE POLICY "Allow service role to manage strategies" 
ON trading_strategies FOR ALL TO service_role USING (true) WITH CHECK (true);

-- 5. Automatización de fecha de actualización
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_trading_strategies_updated_at ON trading_strategies;
CREATE TRIGGER update_trading_strategies_updated_at
    BEFORE UPDATE ON trading_strategies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Añadir columna display_name a la tabla trading_strategies
ALTER TABLE trading_strategies ADD COLUMN IF NOT EXISTS display_name TEXT;

-- Comentario para documentar el propósito de la columna
COMMENT ON COLUMN trading_strategies.display_name IS 'Nombre visible de la estrategia para los usuarios. Si es NULL, se usa el campo name.';

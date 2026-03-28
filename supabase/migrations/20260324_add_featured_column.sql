-- Add is_featured column to trading_strategies
ALTER TABLE trading_strategies ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- Ensure only one strategy can be featured at a time (optional but often desired)
-- If we want multiple featured, we can skip this. 
-- The user said "que esa destacada salga", singular usually implies one.
-- But let's keep it simple for now and just add the column.

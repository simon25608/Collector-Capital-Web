-- Add is_visible column to trading_strategies
ALTER TABLE trading_strategies ADD COLUMN is_visible BOOLEAN NOT NULL DEFAULT true;

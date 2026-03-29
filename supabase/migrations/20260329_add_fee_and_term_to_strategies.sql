-- Add performance_fee and minimum_term columns to trading_strategies
-- performance_fee: percentage taken from profits (e.g. 20 means 20%)
-- minimum_term: human-readable lock-up period (e.g. 'Liquid', '3 months', '6 months')
ALTER TABLE trading_strategies
  ADD COLUMN performance_fee NUMERIC(5,2) NOT NULL DEFAULT 0,
  ADD COLUMN minimum_term TEXT NOT NULL DEFAULT 'Liquid';

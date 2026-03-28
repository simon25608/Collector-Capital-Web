-- Create user_watchlist table
CREATE TABLE IF NOT EXISTS user_watchlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  strategy_id UUID NOT NULL REFERENCES trading_strategies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, strategy_id)
);

-- Enable RLS
ALTER TABLE user_watchlist ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own watchlist"
  ON user_watchlist FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their own watchlist"
  ON user_watchlist FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from their own watchlist"
  ON user_watchlist FOR DELETE
  USING (auth.uid() = user_id);

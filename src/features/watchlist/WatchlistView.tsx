import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';
import { StrategyCard } from '@/features/strategy/StrategyCard';
import { Loader2, Bookmark, AlertCircle } from 'lucide-react';

export function WatchlistView({ onNavigate }: { onNavigate: (view: string, id?: string) => void }) {
  const { t } = useTranslation();
  const [strategies, setStrategies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setError(t('auth.signIn', 'Sign In required'));
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('user_watchlist')
          .select(`
            strategy_id,
            trading_strategies (*)
          `)
          .eq('user_id', user.id);

        if (error) throw error;

        if (data) {
          // Extract the nested trading_strategies objects and filter out invisible ones
          const extractedStrategies = data
            .map(item => item.trading_strategies)
            .filter(strategy => strategy !== null && (strategy as any).is_visible !== false); // Filter out any nulls if a strategy was deleted or is invisible
          setStrategies(extractedStrategies);
        }
      } catch (err: any) {
        setError(err.message || 'Error fetching watchlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [t]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="w-full max-w-7xl mx-auto px-6 py-24 min-h-[80vh]">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30">
          <Bookmark className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-on-surface">{t('navbar.myWatchlist', 'My Watchlist')}</h1>
          <p className="text-on-surface-variant mt-1">{t('watchlist.subtitle', 'Strategies you are currently tracking.')}</p>
        </div>
      </div>

      {error ? (
        <div className="p-6 bg-error/10 border border-error/20 rounded-2xl flex items-center gap-4 text-error">
          <AlertCircle className="w-6 h-6" />
          <p className="font-medium">{error}</p>
        </div>
      ) : strategies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map(strategy => (
            <StrategyCard 
              key={strategy.id} 
              strategy={strategy} 
              onClick={() => onNavigate('strategy-detail', strategy.id)} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-16 bg-surface-container-low border border-outline-variant/10 rounded-3xl text-center">
          <Bookmark className="w-16 h-16 text-on-surface-variant/30 mb-6" />
          <h3 className="text-xl font-bold text-on-surface mb-2">{t('watchlist.emptyTitle', 'Your watchlist is empty')}</h3>
          <p className="text-on-surface-variant mb-8 max-w-md">
            {t('watchlist.emptyDesc', 'Explore our strategy catalog and bookmark the ones you want to track over time.')}
          </p>
          <button 
            onClick={() => onNavigate('strategies')}
            className="px-8 py-3 bg-primary text-on-primary rounded-xl font-bold hover:bg-primary/90 transition-colors"
          >
            {t('dashboard.exploreStrategies', 'Explore Strategies')}
          </button>
        </div>
      )}
    </main>
  );
}

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Bookmark } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export interface Strategy {
  id: string;
  name: string;
  monthly_return: number;
  win_rate: number;
  drawdown: number;
  profit_factor: number;
  investors: number;
  aum: string;
  chart_data?: any;
}

interface StrategyCardProps {
  strategy: Strategy;
  onClick: () => void;
}

export const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, onClick }) => {
  const { t } = useTranslation();
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkWatchlistStatus = async () => {
      if (!isSupabaseConfigured) return;
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsAuthenticated(false);
          return;
        }
        setIsAuthenticated(true);

        const { data, error } = await supabase
          .from('user_watchlist')
          .select('id')
          .eq('user_id', user.id)
          .eq('strategy_id', strategy.id)
          .single();

        if (data) {
          setIsWatchlisted(true);
        }
      } catch (err) {
        // Ignore errors (e.g., no rows found)
      }
    };

    checkWatchlistStatus();
  }, [strategy.id]);

  const handleToggleWatchlist = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card's onClick
    if (!isSupabaseConfigured || isToggling) return;

    setIsToggling(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Optionally show a login prompt here
        setIsToggling(false);
        return;
      }

      if (isWatchlisted) {
        // Remove from watchlist
        await supabase
          .from('user_watchlist')
          .delete()
          .eq('user_id', user.id)
          .eq('strategy_id', strategy.id);
        setIsWatchlisted(false);
      } else {
        // Add to watchlist
        await supabase
          .from('user_watchlist')
          .insert({
            user_id: user.id,
            strategy_id: strategy.id
          });
        setIsWatchlisted(true);
      }
    } catch (err) {
      console.error('Error toggling watchlist:', err);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div 
      className="bg-surface-container-low group hover:bg-surface-container transition-all duration-300 rounded-xl overflow-hidden flex flex-col cursor-pointer relative"
      onClick={onClick}
    >
      <div className="p-8 pb-4">
        <div className="flex justify-between items-start mb-6">
          <div className="pr-4">
            <span className="text-[0.6875rem] uppercase tracking-wider font-bold text-primary mb-1 block">
              {strategy.drawdown > 15 ? t('dashboard.highRisk') : strategy.drawdown > 8 ? t('dashboard.mediumRisk') : t('dashboard.lowRisk')}
            </span>
            <h3 className="text-xl font-bold text-on-surface">{strategy.name}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-[0.6875rem] font-bold rounded-full border ${
              strategy.drawdown > 15 
                ? 'bg-tertiary-container/10 text-tertiary border-tertiary/20' 
                : strategy.drawdown > 8
                ? 'bg-secondary-container/10 text-secondary border-secondary/20'
                : 'bg-primary-container/10 text-primary border-primary/20'
            }`}>
              {strategy.drawdown > 15 ? t('dashboard.highRisk').toUpperCase() : strategy.drawdown > 8 ? t('dashboard.mediumRisk').toUpperCase() : t('dashboard.lowRisk').toUpperCase()}
            </span>
            {isAuthenticated && (
              <button
                onClick={handleToggleWatchlist}
                disabled={isToggling}
                className="p-1.5 rounded-full bg-surface-container-highest/50 hover:bg-surface-container-highest transition-all text-on-surface-variant hover:text-primary disabled:opacity-50"
                title={isWatchlisted ? t('watchlist.remove', 'Remove from watchlist') : t('watchlist.add', 'Add to watchlist')}
              >
                <Bookmark className={`w-4 h-4 ${isWatchlisted ? 'fill-primary text-primary' : ''}`} />
              </button>
            )}
          </div>
        </div>
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-on-surface-variant block mb-1">{t('dashboard.monthlyReturn')}</span>
            <span className={`text-3xl font-bold ${strategy.monthly_return >= 0 ? 'text-primary' : 'text-tertiary'}`}>
              {strategy.monthly_return >= 0 ? '+' : ''}{strategy.monthly_return.toFixed(2)}%
            </span>
          </div>
          {/* Mock Sparkline */}
          <div className="h-12 w-32 flex items-end gap-1">
            <div className="w-full bg-primary/20 h-1/4 rounded-t-sm"></div>
            <div className="w-full bg-primary/20 h-2/4 rounded-t-sm"></div>
            <div className="w-full bg-primary/40 h-3/4 rounded-t-sm"></div>
            <div className="w-full bg-primary/60 h-2/4 rounded-t-sm"></div>
            <div className="w-full bg-primary/80 h-4/4 rounded-t-sm shadow-[0_0_8px_rgba(78,222,163,0.3)]"></div>
          </div>
        </div>
      </div>
      <div className="mt-auto px-8 pb-8">
        <div className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-outline-variant/10">
          <div>
            <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-on-surface-variant block mb-1">{t('dashboard.maxDrawdown')}</span>
            <span className="text-sm font-bold text-on-surface">{strategy.drawdown.toFixed(2)}%</span>
          </div>
          <div>
            <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-on-surface-variant block mb-1">{t('dashboard.investors')}</span>
            <span className="text-sm font-bold text-on-surface">{strategy.investors.toLocaleString()}</span>
          </div>
        </div>
        <button 
          className="w-full flex items-center justify-between px-6 py-3.5 bg-surface-container-highest hover:bg-primary/10 text-on-surface hover:text-primary rounded-xl font-bold transition-all border border-outline-variant/10 hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(78,222,163,0.1)]"
        >
          {t('dashboard.explore')}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

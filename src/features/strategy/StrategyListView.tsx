import React from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StrategyListViewProps {
  onNavigate: (view: string) => void;
}

export function StrategyListView({ onNavigate }: StrategyListViewProps) {
  const { t } = useTranslation();

  return (
    <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <header className="mb-16 max-w-3xl">
        <h1 className="text-5xl font-extrabold text-on-surface tracking-tight mb-4">{t('strategies.title')}</h1>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          {t('strategies.subtitle')}
        </p>
      </header>

      {/* Search & Filter Bar */}
      <section className="mb-12">
        <div className="bg-surface-container-low rounded-xl p-6 flex flex-col lg:flex-row items-center gap-6">
          {/* Search Input */}
          <div className="relative w-full lg:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
            <input 
              className="w-full bg-surface-container-highest border-none rounded-lg py-3 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-secondary/20 transition-all outline-none" 
              placeholder={t('strategies.searchPlaceholder')} 
              type="text"
            />
          </div>

          {/* Filters Group */}
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            <div className="flex flex-col gap-1">
              <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-on-surface-variant ml-1">{t('strategies.riskLevel')}</span>
              <select className="bg-surface-container-highest border-none rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-secondary/20 min-w-[140px] outline-none text-on-surface">
                <option>All Risks</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-on-surface-variant ml-1">{t('strategies.assetType')}</span>
              <select className="bg-surface-container-highest border-none rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-secondary/20 min-w-[140px] outline-none text-on-surface">
                <option>All Assets</option>
                <option>Majors</option>
                <option>Minors</option>
                <option>Exotics</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-on-surface-variant ml-1">{t('strategies.returnRange')}</span>
              <select className="bg-surface-container-highest border-none rounded-lg text-sm px-4 py-2 focus:ring-2 focus:ring-secondary/20 min-w-[140px] outline-none text-on-surface">
                <option>Any Return</option>
                <option>5%+</option>
                <option>15%+</option>
                <option>25%+</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Strategy Card 1 */}
        <div className="bg-surface-container-low group hover:bg-surface-container transition-all duration-300 rounded-xl overflow-hidden flex flex-col">
          <div className="p-8 pb-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[0.6875rem] uppercase tracking-wider font-bold text-primary mb-1 block">Institutional</span>
                <h3 className="text-xl font-bold text-on-surface">Alpha Scalper</h3>
              </div>
              <span className="px-3 py-1 bg-tertiary-container/10 text-tertiary text-[0.6875rem] font-bold rounded-full border border-tertiary/20">HIGH RISK</span>
            </div>
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-on-surface-variant block mb-1">30-Day Return</span>
                <span className="text-3xl font-bold text-primary">+12.4%</span>
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
            <button 
              onClick={() => onNavigate('strategy-detail')}
              className="w-full bg-gradient-to-br from-primary to-[#10b981] text-on-primary py-3 rounded-lg font-bold flex items-center justify-center gap-2 group-hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all active:scale-95"
            >
              {t('strategies.exploreStrategy')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Strategy Card 2 */}
        <div className="bg-surface-container-low group hover:bg-surface-container transition-all duration-300 rounded-xl overflow-hidden flex flex-col">
          <div className="p-8 pb-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[0.6875rem] uppercase tracking-wider font-bold text-secondary mb-1 block">Systematic</span>
                <h3 className="text-xl font-bold text-on-surface">Global Macro</h3>
              </div>
              <span className="px-3 py-1 bg-primary-container/10 text-primary text-[0.6875rem] font-bold rounded-full border border-primary/20">LOW RISK</span>
            </div>
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-on-surface-variant block mb-1">30-Day Return</span>
                <span className="text-3xl font-bold text-primary">+4.2%</span>
              </div>
              <div className="h-12 w-32 flex items-end gap-1">
                <div className="w-full bg-primary/40 h-3/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/40 h-3/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/40 h-3/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/40 h-3/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/80 h-3/4 rounded-t-sm shadow-[0_0_8px_rgba(78,222,163,0.3)]"></div>
              </div>
            </div>
          </div>
          <div className="mt-auto px-8 pb-8">
            <button 
              onClick={() => onNavigate('strategy-detail')}
              className="w-full bg-surface-container-highest text-on-surface py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-surface-bright transition-all active:scale-95"
            >
              {t('strategies.exploreStrategy')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Strategy Card 3 */}
        <div className="bg-surface-container-low group hover:bg-surface-container transition-all duration-300 rounded-xl overflow-hidden flex flex-col">
          <div className="p-8 pb-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[0.6875rem] uppercase tracking-wider font-bold text-primary mb-1 block">Arbitrage</span>
                <h3 className="text-xl font-bold text-on-surface">Momentum Pro</h3>
              </div>
              <span className="px-3 py-1 bg-secondary-container/10 text-secondary text-[0.6875rem] font-bold rounded-full border border-secondary/20">MEDIUM RISK</span>
            </div>
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-on-surface-variant block mb-1">30-Day Return</span>
                <span className="text-3xl font-bold text-primary">+8.7%</span>
              </div>
              <div className="h-12 w-32 flex items-end gap-1">
                <div className="w-full bg-primary/20 h-1/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/40 h-2/4 rounded-t-sm"></div>
                <div className="w-full bg-tertiary/40 h-2/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/60 h-3/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/80 h-4/4 rounded-t-sm shadow-[0_0_8px_rgba(78,222,163,0.3)]"></div>
              </div>
            </div>
          </div>
          <div className="mt-auto px-8 pb-8">
            <button 
              onClick={() => onNavigate('strategy-detail')}
              className="w-full bg-surface-container-highest text-on-surface py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-surface-bright transition-all active:scale-95"
            >
              {t('strategies.exploreStrategy')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Strategy Card 4 */}
        <div className="bg-surface-container-low group hover:bg-surface-container transition-all duration-300 rounded-xl overflow-hidden flex flex-col">
          <div className="p-8 pb-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[0.6875rem] uppercase tracking-wider font-bold text-secondary mb-1 block">Stable</span>
                <h3 className="text-xl font-bold text-on-surface">Yield Optimizer</h3>
              </div>
              <span className="px-3 py-1 bg-primary-container/10 text-primary text-[0.6875rem] font-bold rounded-full border border-primary/20">LOW RISK</span>
            </div>
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-on-surface-variant block mb-1">30-Day Return</span>
                <span className="text-3xl font-bold text-primary">+2.1%</span>
              </div>
              <div className="h-12 w-32 flex items-end gap-1">
                <div className="w-full bg-primary/40 h-2/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/40 h-2/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/40 h-2/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/40 h-2/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/80 h-2/4 rounded-t-sm shadow-[0_0_8px_rgba(78,222,163,0.3)]"></div>
              </div>
            </div>
          </div>
          <div className="mt-auto px-8 pb-8">
            <button 
              onClick={() => onNavigate('strategy-detail')}
              className="w-full bg-surface-container-highest text-on-surface py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-surface-bright transition-all active:scale-95"
            >
              {t('strategies.exploreStrategy')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Strategy Card 5 */}
        <div className="bg-surface-container-low group hover:bg-surface-container transition-all duration-300 rounded-xl overflow-hidden flex flex-col">
          <div className="p-8 pb-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[0.6875rem] uppercase tracking-wider font-bold text-primary mb-1 block">Trend</span>
                <h3 className="text-xl font-bold text-on-surface">Titan Flow</h3>
              </div>
              <span className="px-3 py-1 bg-secondary-container/10 text-secondary text-[0.6875rem] font-bold rounded-full border border-secondary/20">MEDIUM RISK</span>
            </div>
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-on-surface-variant block mb-1">30-Day Return</span>
                <span className="text-3xl font-bold text-primary">+15.8%</span>
              </div>
              <div className="h-12 w-32 flex items-end gap-1">
                <div className="w-full bg-primary/20 h-1/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/30 h-1/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/50 h-2/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/70 h-3/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/90 h-4/4 rounded-t-sm shadow-[0_0_8px_rgba(78,222,163,0.3)]"></div>
              </div>
            </div>
          </div>
          <div className="mt-auto px-8 pb-8">
            <button 
              onClick={() => onNavigate('strategy-detail')}
              className="w-full bg-surface-container-highest text-on-surface py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-surface-bright transition-all active:scale-95"
            >
              {t('strategies.exploreStrategy')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Strategy Card 6 */}
        <div className="bg-surface-container-low group hover:bg-surface-container transition-all duration-300 rounded-xl overflow-hidden flex flex-col">
          <div className="p-8 pb-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[0.6875rem] uppercase tracking-wider font-bold text-primary mb-1 block">Experimental</span>
                <h3 className="text-xl font-bold text-on-surface">Neural Divergence</h3>
              </div>
              <span className="px-3 py-1 bg-tertiary-container/10 text-tertiary text-[0.6875rem] font-bold rounded-full border border-tertiary/20">HIGH RISK</span>
            </div>
            <div className="flex items-end justify-between gap-4 mb-6">
              <div>
                <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-on-surface-variant block mb-1">30-Day Return</span>
                <span className="text-3xl font-bold text-tertiary">-3.1%</span>
              </div>
              <div className="h-12 w-32 flex items-end gap-1">
                <div className="w-full bg-primary/20 h-4/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/20 h-3/4 rounded-t-sm"></div>
                <div className="w-full bg-tertiary/40 h-2/4 rounded-t-sm"></div>
                <div className="w-full bg-tertiary/60 h-1/4 rounded-t-sm"></div>
                <div className="w-full bg-tertiary/80 h-1/4 rounded-t-sm shadow-[0_0_8px_rgba(255,179,173,0.3)]"></div>
              </div>
            </div>
          </div>
          <div className="mt-auto px-8 pb-8">
            <button 
              onClick={() => onNavigate('strategy-detail')}
              className="w-full bg-surface-container-highest text-on-surface py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-surface-bright transition-all active:scale-95"
            >
              {t('strategies.exploreStrategy')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}

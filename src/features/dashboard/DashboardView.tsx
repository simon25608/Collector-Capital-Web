import { TrendingUp, Globe, Zap, Landmark, Monitor, Droplet, ShieldCheck, Layers, Shield } from "lucide-react"
import { useTranslation } from 'react-i18next';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen">
      {/* Hero Section: Featured Strategy */}
      <section className="relative px-8 py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 30%, #4edea3 0%, transparent 70%)' }}></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full border border-outline-variant/15">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant">{t('dashboard.featuredStrategy')}</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-on-surface leading-[1.1]">
              {t('dashboard.heroTitle')} <span className="text-primary">Strategy</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
              {t('dashboard.heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-12 pt-4">
              <div>
                <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant mb-1">Cumulative Gain</p>
                <p className="text-4xl font-bold text-primary">+142.50%</p>
              </div>
              <div>
                <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant mb-1">Max Drawdown</p>
                <p className="text-4xl font-bold text-tertiary">-8.4%</p>
              </div>
              <div>
                <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant mb-1">Investors</p>
                <p className="text-4xl font-bold text-on-surface">1,248</p>
              </div>
            </div>
            <div className="flex items-center gap-6 pt-6">
              <button 
                onClick={() => onNavigate('strategy-detail')}
                className="bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-10 py-4 rounded-lg font-bold text-base uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                {t('dashboard.investNow')}
              </button>
              <button 
                onClick={() => onNavigate('strategy-detail')}
                className="bg-surface-container-highest text-on-surface px-10 py-4 rounded-lg font-bold text-base uppercase tracking-widest hover:bg-surface-bright transition-colors"
              >
                {t('dashboard.viewLedger')}
              </button>
            </div>
          </div>
          <div className="flex-1 w-full lg:w-auto">
            <div className="bg-surface-container-low/70 backdrop-blur-xl p-8 rounded-xl border border-outline-variant/15 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <TrendingUp className="text-primary/40 w-16 h-16" />
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Performance Curve</h3>
                <p className="text-sm text-on-surface-variant">Last 12 Months Performance History</p>
              </div>
              <div className="h-64 flex items-end gap-2">
                <div className="w-full bg-surface-container-low h-[20%] rounded-t-sm"></div>
                <div className="w-full bg-surface-container-low h-[35%] rounded-t-sm"></div>
                <div className="w-full bg-surface-container-low h-[25%] rounded-t-sm"></div>
                <div className="w-full bg-surface-container-high h-[45%] rounded-t-sm"></div>
                <div className="w-full bg-primary/40 h-[60%] rounded-t-sm"></div>
                <div className="w-full bg-primary/60 h-[55%] rounded-t-sm"></div>
                <div className="w-full bg-primary/80 h-[75%] rounded-t-sm"></div>
                <div className="w-full bg-primary h-[90%] rounded-t-sm shadow-[0_0_15px_rgba(78,222,163,0.3)]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Catalog Section */}
      <section className="bg-[#131b2e] py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Strategy Catalog</h2>
              <p className="text-on-surface-variant max-w-md">Discover curated portfolios managed by top-tier algorithms and experienced desk traders.</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-surface-container-high px-4 py-2 rounded-lg text-sm font-medium border border-outline-variant/10 hover:bg-surface-container-highest transition-colors">Filter: All Assets</button>
              <button className="bg-surface-container-high px-4 py-2 rounded-lg text-sm font-medium border border-outline-variant/10 hover:bg-surface-container-highest transition-colors">Sort: Return</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Strategy Card 1 */}
            <div onClick={() => onNavigate('strategy-detail')} className="bg-surface-container-high p-8 rounded-xl hover:translate-y-[-4px] transition-transform duration-300 group cursor-pointer border border-outline-variant/5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-bold group-hover:text-primary transition-colors">Alpha Momentum</h4>
                  <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant">Medium Risk</span>
                </div>
                <div className="bg-surface-container-highest p-2 rounded-lg">
                  <TrendingUp className="text-secondary w-5 h-5" />
                </div>
              </div>
              <div className="mb-6 h-12 flex items-center overflow-hidden opacity-80 rounded">
                <img alt="Alpha Momentum Chart" className="w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWLeAdXhicGod-KaHisf8hyv9ufCBld7ZIoJkKfJOKEbYZUJYKoGpSqp4GnWdCrZeX_WfjjQgueGanuhlCU2hhe8mDJuAx0Yl8V7J-n64ckj_bKvGJYgs-x76UcK6xnSLPimkMES4O091nF8dMFFWYztEAaS2txWIEfp8YTtCqgqVG2MpphHQCG5ny6mc2wmHK5-37tT5grFSdYwI2yjT1gMCR_yhvxbaM9RxtbhAapIXkH2QiKhQrYSJpEbVqqWVyzMZwYdfGmGI"/>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant mb-1">Total Return</p>
                  <p className="text-2xl font-bold text-primary">+42.18%</p>
                </div>
                <button className="text-secondary text-sm font-bold uppercase tracking-widest hover:underline underline-offset-4">Explore</button>
              </div>
            </div>

            {/* Strategy Card 2 */}
            <div onClick={() => onNavigate('strategy-detail')} className="bg-surface-container-high p-8 rounded-xl hover:translate-y-[-4px] transition-transform duration-300 group cursor-pointer border border-outline-variant/5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-bold group-hover:text-primary transition-colors">Global Macro</h4>
                  <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant">Low Risk</span>
                </div>
                <div className="bg-surface-container-highest p-2 rounded-lg">
                  <Globe className="text-secondary w-5 h-5" />
                </div>
              </div>
              <div className="mb-6 h-12 flex items-center overflow-hidden opacity-80 rounded">
                <img alt="Global Macro Chart" className="w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxbOF3QXsNfAN5E0Bz4MAZ4gyppZe2COUTXszlp6TOXjCoB3DoHdS-Bte7A8brxWewJp4JtKyTU27YYcLtCMzKe1FU5f8RwJyE957L6_MgMXJsmoiEAWwOiN-MMRGXahw-okGaz_QWmzUJRBNOLFPfhKPKzMGIwStxobP9ll_ahzv3Jh7NfJFA5ylhD92C5qdOAoSxGU6WEKEF4LunWVi_ciug1-sIlPZVQWvnO-plVwSoNbMhE87YpM5eeIunH6-Xc9yhiTSOfUE"/>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant mb-1">Total Return</p>
                  <p className="text-2xl font-bold text-primary">+12.40%</p>
                </div>
                <button className="text-secondary text-sm font-bold uppercase tracking-widest hover:underline underline-offset-4">Explore</button>
              </div>
            </div>

            {/* Strategy Card 3 */}
            <div onClick={() => onNavigate('strategy-detail')} className="bg-surface-container-high p-8 rounded-xl hover:translate-y-[-4px] transition-transform duration-300 group cursor-pointer border border-outline-variant/5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-bold group-hover:text-primary transition-colors">Eurusd Scalper</h4>
                  <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant">High Risk</span>
                </div>
                <div className="bg-surface-container-highest p-2 rounded-lg">
                  <Zap className="text-secondary w-5 h-5" />
                </div>
              </div>
              <div className="mb-6 h-12 flex items-center overflow-hidden opacity-80 rounded">
                <img alt="Eurusd Scalper Chart" className="w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlHVbB1TU1VsPTV9zLu9qi6Ke5SvKkmXFUWmc0JY-CA63ZeXwL_BI4-jvOsAe737xj_1T2ETkfLPjenuMQMGxbdM7Vd3I57YyaQjLziaaA9mzCCA6E5DuDOh0vlbaDFAJluG8L_0Yg8YuZRZH9Rje6-vzjzD3dU-Ecd6I7M42mL7TcCVtzVpuv5FvZljHfEgNLfwQ1DqUVoheSfmPDRAWkBpoqmnEKIDkaPBUOF3LDMLB6-VzIIDomECTfUrF3rFDjSDqWgGVAJ70"/>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant mb-1">Total Return</p>
                  <p className="text-2xl font-bold text-primary">+89.33%</p>
                </div>
                <button className="text-secondary text-sm font-bold uppercase tracking-widest hover:underline underline-offset-4">Explore</button>
              </div>
            </div>

            {/* Strategy Card 4 */}
            <div onClick={() => onNavigate('strategy-detail')} className="bg-surface-container-high p-8 rounded-xl hover:translate-y-[-4px] transition-transform duration-300 group cursor-pointer border border-outline-variant/5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-bold group-hover:text-primary transition-colors">Yen Carry Master</h4>
                  <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant">Medium Risk</span>
                </div>
                <div className="bg-surface-container-highest p-2 rounded-lg">
                  <Landmark className="text-secondary w-5 h-5" />
                </div>
              </div>
              <div className="mb-6 h-12 flex items-center overflow-hidden opacity-80 rounded">
                <img alt="Yen Carry Chart" className="w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3dk5KQTaDgwpxXDdunCCAxqDPL6iyFhl0TabIzJdDxv54nl4zDPTQjWIoInSXHP8zxkcdEGDb147zH8TMOiyPBLgr7nWaVhiaFPH22gyxP3MQVOztg9s3t8NQFlhYnwEpo73tcX9rr1GyCQyv98c5gv95i4d3Okock_aVWThC2xhbYKNgoIeWCUSeipZyqxPO86jnHmPxttw8lzKPeWtV1j-2h8Pxd0rb_ouF6BeBU2cFpRVNJM_GqR9xQUKgid3UVE1LOEeECYc"/>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant mb-1">Total Return</p>
                  <p className="text-2xl font-bold text-primary">+34.10%</p>
                </div>
                <button className="text-secondary text-sm font-bold uppercase tracking-widest hover:underline underline-offset-4">Explore</button>
              </div>
            </div>

            {/* Strategy Card 5 */}
            <div onClick={() => onNavigate('strategy-detail')} className="bg-surface-container-high p-8 rounded-xl hover:translate-y-[-4px] transition-transform duration-300 group cursor-pointer border border-outline-variant/5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-bold group-hover:text-primary transition-colors">Tech Basket</h4>
                  <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant">Medium Risk</span>
                </div>
                <div className="bg-surface-container-highest p-2 rounded-lg">
                  <Monitor className="text-secondary w-5 h-5" />
                </div>
              </div>
              <div className="mb-6 h-12 flex items-center overflow-hidden opacity-80 rounded">
                <img alt="Tech Basket Chart" className="w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj37gQMmVwV_OIStXmiYHz4MHLX6khqSOcmMgthA4BcisOJRZD3bvCXoU4DhqnnKtCwf8cAN3lPcMWcV777YKtYUDvd_q7ST5ZwbrCfIsb2yROA9_kwlUGN01OmFDo0ZgKqNsj02laMlmhgV_VJtNyPDnhS1yiHOk2HnWW8ajbRR5bwxs39Lq6_BY60eoullAiIXiiQnY4xU3uZnER8EqYLQYq7-HJBR_mLoLtW8QDj7xjRGW7F7npdf6N2LLaY2iECvQA8hP9TJU"/>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant mb-1">Total Return</p>
                  <p className="text-2xl font-bold text-primary">+28.55%</p>
                </div>
                <button className="text-secondary text-sm font-bold uppercase tracking-widest hover:underline underline-offset-4">Explore</button>
              </div>
            </div>

            {/* Strategy Card 6 */}
            <div onClick={() => onNavigate('strategy-detail')} className="bg-surface-container-high p-8 rounded-xl hover:translate-y-[-4px] transition-transform duration-300 group cursor-pointer border border-outline-variant/5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-bold group-hover:text-primary transition-colors">Commodity Peak</h4>
                  <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant">High Risk</span>
                </div>
                <div className="bg-surface-container-highest p-2 rounded-lg">
                  <Droplet className="text-secondary w-5 h-5" />
                </div>
              </div>
              <div className="mb-6 h-12 flex items-center overflow-hidden opacity-80 rounded">
                <img alt="Commodity Peak Chart" className="w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbjUaCbpdBhl9FBqpkerENfcw7mfS4iq7RQka0F61fWlw9di-xmnVRn7Gnsdbjkiyr6Btl_UrqR6UhJ-MMfkGT2AhPvUVblx0CWhqq-k14E25Yz0eK-zaUgJ8gGEtmHz7gBW4LVRIDMzpO07L-6aOoGj7I5C0lA9mBYtzUFhXgKrp1c5g2j2lI2T4Tpx8HHF-sASuaJoTWcjg5wyzWzcV7_EBTc1QmBxcB6OPyXMFa1R0ilMQCsqoy0_GdmXZeqtyCm2xEhIJ7TLM"/>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant mb-1">Total Return</p>
                  <p className="text-2xl font-bold text-primary">+56.12%</p>
                </div>
                <button className="text-secondary text-sm font-bold uppercase tracking-widest hover:underline underline-offset-4">Explore</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Excellence Section */}
      <section className="py-24 px-8 overflow-hidden relative">
        <div className="absolute bottom-0 left-0 -z-10 w-1/2 h-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle at 10% 80%, #adc6ff 0%, transparent 70%)' }}></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 leading-tight">Institutional Excellence <br/>For Every <span className="text-secondary">Portfolio</span></h2>
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="bg-surface-container-high w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border border-outline-variant/10">
                    <ShieldCheck className="text-primary w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Verified Performance</h4>
                    <p className="text-on-surface-variant">Every track record is audited and verified in real-time. What you see is exactly what our traders achieve.</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="bg-surface-container-high w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border border-outline-variant/10">
                    <Layers className="text-primary w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Multi-Asset Execution</h4>
                    <p className="text-on-surface-variant">Access Forex, Commodities, and Equities through a single unified portal designed for professional clarity.</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="bg-surface-container-high w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border border-outline-variant/10">
                    <Shield className="text-primary w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Advanced Risk Controls</h4>
                    <p className="text-on-surface-variant">Automated drawdown protection and exposure monitoring safeguard your capital across all active strategies.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-surface-container-high rounded-3xl overflow-hidden border border-outline-variant/10 shadow-2xl">
                <img alt="Interface Visualization" className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDHnMYiuKd8dHggxPxlqMZ-lfYGmWORK_EnxItsapnsvgsVssFinZY7scOsOzvxi7Shrzdllgro-yvYhvJuj0lytCifFv3Oem_FiKtqn2cM__aoYpugIKkziCkllcZQk9T7UBcAJNLAOrAad-NudcxOw12SAvznJ7W4itjCLg-pd4l_ruucgltv72xr-yXnxmHn8pE0suSq6oyfOQl8KcTxF5RKtUj6qsmrKn_sn_tJnkYMWscsmbhJuYZl1QLI7c-p1OMGwinY_M"/>
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-10 -left-10 bg-surface-container-low/70 backdrop-blur-xl p-6 rounded-2xl border border-outline-variant/30 shadow-2xl max-w-xs z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Shield className="text-primary w-5 h-5" />
                  </div>
                  <p className="font-bold text-sm">Risk Shield Active</p>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">System-wide drawdown cap set to 15.0%. Your capital is currently managed under "Safe Guard" protocol.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-surface-container-highest rounded-3xl p-12 lg:p-24 text-center relative overflow-hidden border border-outline-variant/10">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" style={{ background: 'linear-gradient(135deg, #10b981 0%, transparent 50%, #0566d9 100%)' }}></div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 relative z-10">Start Your Architecture of <br/><span className="text-primary">Wealth Today</span></h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto mb-12 text-lg relative z-10">Join thousands of verified investors accessing institutional-grade strategies with zero barriers to entry.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <button 
                onClick={() => onNavigate('auth')}
                className="bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-12 py-5 rounded-lg font-bold text-lg uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.05] transition-transform"
              >
                Create Account
              </button>
              <button 
                onClick={() => onNavigate('dashboard')}
                className="bg-surface-bright text-on-surface border border-outline-variant/20 px-12 py-5 rounded-lg font-bold text-lg uppercase tracking-widest hover:bg-surface-container-highest transition-colors"
              >
                Explore Strategies
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

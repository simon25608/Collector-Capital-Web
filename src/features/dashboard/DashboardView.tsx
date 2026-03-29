import {
  TrendingUp,
  Globe,
  Zap,
  Landmark,
  Monitor,
  Droplet,
  ShieldCheck,
  Layers,
  Shield,
  Loader2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useMemo } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getRiskLevel } from "@/lib/utils";

function getSparklineBars(strategy: Strategy): number[] {
  const seed = strategy.id
    .split("")
    .reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0);
  return Array.from({ length: 8 }, (_, i) => {
    const val = ((seed * (i + 1) * 2654435761) >>> 0) % 65536;
    return Math.round((val / 65536) * 65) + 20; // 20–85%
  }).map((h, i, arr) => {
    if (i === arr.length - 1)
      return strategy.monthly_return > 0 ? Math.max(h, 70) : Math.min(h, 40);
    return h;
  });
}

interface DashboardViewProps {
  onNavigate: (view: string, id?: string) => void;
}

interface Strategy {
  id: string;
  name: string;
  display_name?: string;
  monthly_return: number;
  win_rate: number;
  drawdown: number;
  profit_factor: number;
  investors: number;
  aum: string;
  chart_data?: unknown;
  is_featured: boolean;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const { t } = useTranslation();
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [featuredStrategy, setFeaturedStrategy] = useState<Strategy | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        const [
          { data: strategiesData, error: strategiesError },
          { data: featuredData, error: featuredError },
        ] = await Promise.all([
          supabase
            .from("trading_strategies")
            .select("*")
            .eq("is_visible", true)
            .order("monthly_return", { ascending: false })
            .limit(3),
          supabase
            .from("trading_strategies")
            .select("*")
            .eq("is_featured", true)
            .eq("is_visible", true)
            .maybeSingle(),
        ]);

        if (strategiesError) throw strategiesError;
        if (featuredError) throw featuredError;

        if (strategiesData) setStrategies(strategiesData);
        if (featuredData) {
          setFeaturedStrategy(featuredData);
        } else if (strategiesData && strategiesData.length > 0) {
          setFeaturedStrategy(strategiesData[0]);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const sparklineData = useMemo(
    () => new Map(strategies.map((s) => [s.id, getSparklineBars(s)])),
    [strategies],
  );

  return (
    <main className="min-h-screen">
      {error && (
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-tertiary">{t("dashboard.fetchError")}</p>
        </div>
      )}
      {/* Hero Section: Featured Strategy */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute top-0 right-0 -z-10 w-2/3 h-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, var(--color-primary) 0%, transparent 70%)",
          }}
        ></div>
        {loading ? (
          <div className="max-w-7xl mx-auto flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full border border-outline-variant/15">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant">
                  {t("dashboard.featuredStrategy")}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-on-surface leading-[1.1]">
                {featuredStrategy?.display_name ||
                  featuredStrategy?.name ||
                  t("dashboard.heroTitle")}{" "}
                <span className="text-primary">
                  {t("dashboard.strategyWord")}
                </span>
              </h1>
              <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">
                {t("dashboard.heroSubtitle")}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-12 pt-4">
                <div className="text-center sm:text-left">
                  <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant mb-1">
                    {t("dashboard.cumulativeGain")}
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-primary">
                    {featuredStrategy
                      ? `+${featuredStrategy.monthly_return.toFixed(2)}%`
                      : "—"}
                  </p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant mb-1">
                    {t("dashboard.maxDrawdown")}
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-tertiary">
                    {Math.abs(featuredStrategy?.drawdown ?? 0).toFixed(1)}%
                  </p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant mb-1">
                    {t("dashboard.investors")}
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-on-surface">
                    {featuredStrategy?.investors.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6">
                <button
                  onClick={() =>
                    onNavigate("strategy-detail", featuredStrategy?.id)
                  }
                  className="bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-lg font-bold text-base uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform text-center"
                >
                  {t("dashboard.investNow")}
                </button>
                <button
                  onClick={() =>
                    onNavigate("strategy-detail", featuredStrategy?.id)
                  }
                  className="bg-surface-container-highest text-on-surface px-8 py-4 rounded-lg font-bold text-base uppercase tracking-widest hover:bg-surface-bright transition-colors text-center"
                >
                  {t("dashboard.viewLedger")}
                </button>
              </div>
            </div>
            <div className="flex-1 w-full lg:w-auto">
              <div className="bg-surface-container-low/70 backdrop-blur-xl p-8 rounded-xl border border-outline-variant/15 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <TrendingUp className="text-primary/40 w-16 h-16" />
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">
                    {t("dashboard.performanceCurve")}
                  </h3>
                  <p className="text-sm text-on-surface-variant">
                    {t("dashboard.performanceHistory")}
                  </p>
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
        )}
      </section>

      {/* Strategy Catalog Section */}
      <section className="bg-[#131b2e] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6 mb-10 sm:mb-16">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                {t("dashboard.strategyCatalog")}
              </h2>
              <p className="text-on-surface-variant max-w-md">
                {t("dashboard.strategyCatalogSubtitle")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {loading ? (
              <div className="col-span-full flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : strategies.length > 0 ? (
              strategies.map((strategy) => {
                const risk = getRiskLevel(strategy.drawdown);
                return (
                  <button
                    key={strategy.id}
                    onClick={() => onNavigate("strategy-detail", strategy.id)}
                    className="bg-surface-container-high p-5 sm:p-8 rounded-xl hover:translate-y-[-4px] transition-transform duration-300 group cursor-pointer border border-outline-variant/5 text-left w-full"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-lg font-bold group-hover:text-primary transition-colors">
                          {strategy.display_name || strategy.name}
                        </h4>
                        <span
                          className={`text-[0.6875rem] font-medium uppercase tracking-widest ${risk.colorClass}`}
                        >
                          {t(risk.dashboardKey)}
                        </span>
                      </div>
                      <div className="bg-surface-container-highest p-2 rounded-lg">
                        <TrendingUp className="text-secondary w-5 h-5" />
                      </div>
                    </div>
                    <div className="mb-6 h-12 flex items-end gap-0.5 overflow-hidden rounded">
                      {(sparklineData.get(strategy.id) ?? []).map((h, i) => (
                        <div
                          key={`${strategy.id}-bar-${i}`}
                          style={{ height: `${h}%` }}
                          className={`w-full rounded-t-sm ${
                            i === 7
                              ? "bg-primary shadow-[0_0_8px_rgba(78,222,163,0.4)]"
                              : "bg-primary/50"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant mb-1">
                          {t("dashboard.monthlyReturn")}
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          +{strategy.monthly_return.toFixed(2)}%
                        </p>
                      </div>
                      <span className="text-secondary text-sm font-bold uppercase tracking-widest hover:underline underline-offset-4">
                        {t("dashboard.explore")}
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              // Fallback static cards if no database connection
              <>
                {/* Strategy Card 1 */}
                <button
                  onClick={() => onNavigate("strategy-detail", "static-1")}
                  className="bg-surface-container-high p-5 sm:p-8 rounded-xl hover:translate-y-[-4px] transition-transform duration-300 group cursor-pointer border border-outline-variant/5 text-left w-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-lg font-bold group-hover:text-primary transition-colors">
                        {t("dashboard.staticStrategy1Name")}
                      </h4>
                      <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant">
                        {t("dashboard.moderateRisk")}
                      </span>
                    </div>
                    <div className="bg-surface-container-highest p-2 rounded-lg">
                      <TrendingUp className="text-secondary w-5 h-5" />
                    </div>
                  </div>
                  <div className="mb-6 h-12 flex items-center overflow-hidden opacity-80 rounded">
                    <img
                      alt="Alpha Momentum Chart"
                      className="w-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWLeAdXhicGod-KaHisf8hyv9ufCBld7ZIoJkKfJOKEbYZUJYKoGpSqp4GnWdCrZeX_WfjjQgueGanuhlCU2hhe8mDJuAx0Yl8V7J-n64ckj_bKvGJYgs-x76UcK6xnSLPimkMES4O091nF8dMFFWYztEAaS2txWIEfp8YTtCqgqVG2MpphHQCG5ny6mc2wmHK5-37tT5grFSdYwI2yjT1gMCR_yhvxbaM9RxtbhAapIXkH2QiKhQrYSJpEbVqqWVyzMZwYdfGmGI"
                    />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant mb-1">
                        {t("dashboard.totalReturn")}
                      </p>
                      <p className="text-2xl font-bold text-primary">{t("dashboard.staticStrategy1Return")}</p>
                    </div>
                    <span className="text-secondary text-sm font-bold uppercase tracking-widest hover:underline underline-offset-4">
                      {t("dashboard.explore")}
                    </span>
                  </div>
                </button>

                {/* Strategy Card 2 */}
                <button
                  onClick={() => onNavigate("strategy-detail", "static-2")}
                  className="bg-surface-container-high p-5 sm:p-8 rounded-xl hover:translate-y-[-4px] transition-transform duration-300 group cursor-pointer border border-outline-variant/5 text-left w-full"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h4 className="text-lg font-bold group-hover:text-primary transition-colors">
                        {t("dashboard.staticStrategy2Name")}
                      </h4>
                      <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant">
                        {t("dashboard.lowRisk")}
                      </span>
                    </div>
                    <div className="bg-surface-container-highest p-2 rounded-lg">
                      <Globe className="text-secondary w-5 h-5" />
                    </div>
                  </div>
                  <div className="mb-6 h-12 flex items-center overflow-hidden opacity-80 rounded">
                    <img
                      alt="Global Macro Chart"
                      className="w-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxbOF3QXsNfAN5E0Bz4MAZ4gyppZe2COUTXszlp6TOXjCoB3DoHdS-Bte7A8brxWewJp4JtKyTU27YYcLtCMzKe1FU5f8RwJyE957L6_MgMXJsmoiEAWwOiN-MMRGXahw-okGaz_QWmzUJRBNOLFPfhKPKzMGIwStxobP9ll_ahzv3Jh7NfJFA5ylhD92C5qdOAoSxGU6WEKEF4LunWVi_ciug1-sIlPZVQWvnO-plVwSoNbMhE87YpM5eeIunH6-Xc9yhiTSOfUE"
                    />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[0.6875rem] font-medium uppercase tracking-widest text-on-surface-variant mb-1">
                        {t("dashboard.totalReturn")}
                      </p>
                      <p className="text-2xl font-bold text-primary">{t("dashboard.staticStrategy2Return")}</p>
                    </div>
                    <span className="text-secondary text-sm font-bold uppercase tracking-widest hover:underline underline-offset-4">
                      {t("dashboard.explore")}
                    </span>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Institutional Excellence Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
        <div
          className="absolute bottom-0 left-0 -z-10 w-1/2 h-full opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 10% 80%, var(--color-secondary) 0%, transparent 70%)",
          }}
        ></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 leading-tight">
                {t("dashboard.institutionalExcellenceTitle")}
              </h2>
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="bg-surface-container-high w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border border-outline-variant/10">
                    <ShieldCheck className="text-primary w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">
                      {t("dashboard.verifiedPerformance")}
                    </h4>
                    <p className="text-on-surface-variant">
                      {t("dashboard.verifiedPerformanceDesc")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="bg-surface-container-high w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border border-outline-variant/10">
                    <Layers className="text-primary w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">
                      {t("dashboard.multiAssetExecution")}
                    </h4>
                    <p className="text-on-surface-variant">
                      {t("dashboard.multiAssetExecutionDesc")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="bg-surface-container-high w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border border-outline-variant/10">
                    <Shield className="text-primary w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">
                      {t("dashboard.advancedRiskControls")}
                    </h4>
                    <p className="text-on-surface-variant">
                      {t("dashboard.advancedRiskControlsDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative hidden sm:block">
              <div className="aspect-square bg-surface-container-high rounded-3xl overflow-hidden border border-outline-variant/10 shadow-2xl">
                <img
                  alt="Interface Visualization"
                  className="w-full h-full object-cover opacity-60"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDHnMYiuKd8dHggxPxlqMZ-lfYGmWORK_EnxItsapnsvgsVssFinZY7scOsOzvxi7Shrzdllgro-yvYhvJuj0lytCifFv3Oem_FiKtqn2cM__aoYpugIKkziCkllcZQk9T7UBcAJNLAOrAad-NudcxOw12SAvznJ7W4itjCLg-pd4l_ruucgltv72xr-yXnxmHn8pE0suSq6oyfOQl8KcTxF5RKtUj6qsmrKn_sn_tJnkYMWscsmbhJuYZl1QLI7c-p1OMGwinY_M"
                />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-10 -left-10 bg-surface-container-low/70 backdrop-blur-xl p-6 rounded-2xl border border-outline-variant/30 shadow-2xl max-w-xs z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Shield className="text-primary w-5 h-5" />
                  </div>
                  <p className="font-bold text-sm">
                    {t("dashboard.riskShieldActive")}
                  </p>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {t("dashboard.riskShieldDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-surface-container-highest rounded-3xl p-8 sm:p-12 lg:p-24 text-center relative overflow-hidden border border-outline-variant/10">
            <div
              className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary-container) 0%, transparent 50%, var(--color-secondary-container) 100%)",
              }}
            ></div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 sm:mb-8 relative z-10">
              {t("dashboard.ctaTitle")}
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto mb-8 sm:mb-12 text-base sm:text-lg relative z-10">
              {t("dashboard.ctaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center relative z-10">
              <button
                onClick={() => onNavigate("auth")}
                className="bg-gradient-to-br from-primary to-primary-container text-on-primary-container px-8 sm:px-12 py-4 sm:py-5 rounded-lg font-bold text-base sm:text-lg uppercase tracking-widest shadow-2xl shadow-primary/20 hover:scale-[1.05] transition-transform"
              >
                {t("dashboard.createAccount")}
              </button>
              <button
                onClick={() => onNavigate("strategies")}
                className="bg-surface-bright text-on-surface border border-outline-variant/20 px-8 sm:px-12 py-4 sm:py-5 rounded-lg font-bold text-base sm:text-lg uppercase tracking-widest hover:bg-surface-container-highest transition-colors"
              >
                {t("dashboard.exploreStrategies")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

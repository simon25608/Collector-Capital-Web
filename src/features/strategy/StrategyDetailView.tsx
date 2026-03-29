import {
  Share,
  Bookmark,
  BadgeCheck,
  Landmark,
  ArrowLeft,
  Loader2,
  Star,
  Check,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { getRiskLevel } from "@/lib/utils";

interface StrategyDetailViewProps {
  onNavigate: (view: string, id?: string) => void;
  strategyId?: string;
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
  chart_data: any;
  is_featured: boolean;
  performance_fee: number;
  minimum_term: string;
}

export function StrategyDetailView({
  onNavigate,
  strategyId,
}: StrategyDetailViewProps) {
  const { t } = useTranslation();
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState<number>(5000);
  const [showComingSoonModal, setShowComingSoonModal] = useState(false);

  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });
    }
  }, []);

  useEffect(() => {
    async function checkWatchlist() {
      if (session && strategy && isSupabaseConfigured) {
        const { data } = await supabase
          .from("user_watchlist")
          .select("id")
          .eq("user_id", session.user.id)
          .eq("strategy_id", strategy.id)
          .maybeSingle();

        setIsInWatchlist(!!data);
      }
    }
    checkWatchlist();
  }, [session, strategy]);

  useEffect(() => {
    async function fetchStrategy() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }

      try {
        let query = supabase
          .from("trading_strategies")
          .select("*")
          .eq("is_visible", true);

        if (strategyId && !strategyId.startsWith("static-")) {
          query = query.eq("id", strategyId);
        } else {
          query = query.limit(1);
        }

        const { data, error } = await query.single();

        if (error) throw error;
        if (data) setStrategy(data);
      } catch (err) {
        console.error("Error fetching strategy:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStrategy();
  }, [strategyId]);

  const handleToggleWatchlist = async () => {
    if (!strategy || !session || !isSupabaseConfigured) return;

    setIsUpdating(true);
    try {
      if (isInWatchlist) {
        // Remove from watchlist
        const { error } = await supabase
          .from("user_watchlist")
          .delete()
          .eq("user_id", session.user.id)
          .eq("strategy_id", strategy.id);

        if (error) throw error;
        setIsInWatchlist(false);
      } else {
        // Add to watchlist
        const { error } = await supabase.from("user_watchlist").insert({
          user_id: session.user.id,
          strategy_id: strategy.id,
        });

        if (error) throw error;
        setIsInWatchlist(true);
      }
    } catch (err) {
      console.error("Error toggling watchlist:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleShare = async () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("view", "strategy-detail");
      if (strategyId) {
        url.searchParams.set("id", strategyId);
      }

      await navigator.clipboard.writeText(url.toString());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <main className="pt-24 px-4 md:px-8 pb-12 max-w-[1600px] mx-auto">
      <button
        onClick={() => onNavigate("strategies")}
        className="flex items-center gap-2 text-sm font-medium text-on-surface-variant hover:text-on-surface mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> {t("strategies.backToStrategies")}
      </button>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Strategy Details (8/12) */}
        <div className="xl:col-span-8 space-y-8">
          {loading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : strategy && (!strategyId || !strategyId.startsWith("static-")) ? (
            <>
              {/* Hero Header */}
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge
                      variant="primary"
                      className="flex items-center gap-1"
                    >
                      <BadgeCheck className="w-3 h-3" />{" "}
                      {t("strategies.verified")}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={`${getRiskLevel(strategy.drawdown).bgClass} ${getRiskLevel(strategy.drawdown).colorClass} border-none`}
                    >
                      {t(getRiskLevel(strategy.drawdown).dashboardKey)}
                    </Badge>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-2">
                    {strategy.display_name || strategy.name}
                  </h1>
                  <p className="text-on-surface-variant flex items-center gap-2">
                    {t("strategies.riskLevel")}:{" "}
                    <span className="text-on-surface font-semibold">
                      {t(getRiskLevel(strategy.drawdown).strategiesKey)} (
                      {Math.abs(strategy.drawdown).toFixed(1)}% DD)
                    </span>
                    <span className="flex gap-0.5 ml-2">
                      {[...Array(10)].map((_, i) => {
                        const risk = getRiskLevel(strategy.drawdown);
                        return (
                          <span
                            key={i}
                            className={`w-4 h-1 rounded-full ${
                              i < risk.filledBars
                                ? risk.barColorClass
                                : "bg-surface-container-highest"
                            }`}
                          ></span>
                        );
                      })}
                    </span>
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2 px-4 py-2"
                    onClick={handleShare}
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Share className="w-4 h-4" />
                    )}
                    {isCopied
                      ? t("strategies.copied", "Copied!")
                      : t("strategies.share")}
                  </Button>
                  {session && (
                    <Button
                      variant={isInWatchlist ? "primary" : "secondary"}
                      className="flex items-center gap-2 px-4 py-2"
                      onClick={handleToggleWatchlist}
                      disabled={isUpdating}
                    >
                      <Bookmark
                        className={`w-4 h-4 ${isInWatchlist ? "fill-current" : ""}`}
                      />
                      {isInWatchlist
                        ? t("strategies.inWatchlist")
                        : t("strategies.addToWatchlist")}
                    </Button>
                  )}
                </div>
              </header>

              {/* Equity Chart Card */}
              <Card className="p-6 relative overflow-hidden group">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-[0.6875rem] font-medium uppercase text-on-surface-variant tracking-wider">
                      {t("dashboard.monthlyReturn")}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <h3
                        className={`text-3xl font-bold ${strategy.monthly_return >= 0 ? "text-primary" : "text-tertiary"}`}
                      >
                        {strategy.monthly_return >= 0 ? "+" : ""}
                        {strategy.monthly_return.toFixed(2)}%
                      </h3>
                    </div>
                  </div>
                  <div className="flex bg-surface-container-lowest p-1 rounded-lg">
                    {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((tf) => (
                      <button
                        key={tf}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${tf === "3M" ? "bg-surface-container-highest text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chart Placeholder Visual */}
                <div className="h-[300px] w-full flex items-end gap-1 relative">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 1000 300"
                  >
                    <defs>
                      <linearGradient
                        id="chartGradient"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#4edea3"
                          stopOpacity="0.3"
                        ></stop>
                        <stop
                          offset="100%"
                          stopColor="#4edea3"
                          stopOpacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,280 L50,260 L100,270 L150,240 L200,250 L250,210 L300,220 L350,180 L400,190 L450,150 L500,160 L550,120 L600,130 L650,90 L700,110 L750,70 L800,85 L850,50 L900,60 L950,20 L1000,40 V300 H0 Z"
                      fill="url(#chartGradient)"
                    ></path>
                    <path
                      className="sparkline-glow"
                      d="M0,280 L50,260 L100,270 L150,240 L200,250 L250,210 L300,220 L350,180 L400,190 L450,150 L500,160 L550,120 L600,130 L650,90 L700,110 L750,70 L800,85 L850,50 L900,60 L950,20 L1000,40"
                      fill="none"
                      stroke="#4edea3"
                      strokeWidth="3"
                    ></path>
                  </svg>
                  <div className="absolute left-0 bottom-0 text-[0.6rem] text-on-surface-variant opacity-50 flex w-full justify-between pb-2">
                    <span>AUG 12</span>
                    <span>SEP 12</span>
                    <span>OCT 12</span>
                    <span>NOV 12</span>
                  </div>
                </div>
              </Card>

              {/* KPI Stats Bar */}
              <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: t("strategies.profitFactor"),
                    value: strategy.profit_factor.toFixed(2),
                  },
                  {
                    label: t("strategies.winRate"),
                    value: `${strategy.win_rate.toFixed(1)}%`,
                  },
                  {
                    label: t("dashboard.maxDrawdown"),
                    value: `${Math.abs(strategy.drawdown).toFixed(2)}%`,
                    isError: getRiskLevel(strategy.drawdown).filledBars > 6,
                  },
                  {
                    label: t("dashboard.investors"),
                    value: strategy.investors.toLocaleString(),
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-surface-container-high p-5 rounded-xl"
                  >
                    <p className="text-[0.6875rem] font-medium uppercase text-on-surface-variant mb-1">
                      {stat.label}
                    </p>
                    <h4
                      className={`text-2xl font-bold ${stat.isError ? "text-tertiary" : "text-on-surface"}`}
                    >
                      {stat.value}
                    </h4>
                  </div>
                ))}
              </section>
            </>
          ) : (
            // Fallback static content
            <>
              {/* Hero Header */}
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge
                      variant="primary"
                      className="flex items-center gap-1"
                    >
                      <BadgeCheck className="w-3 h-3" /> Verified
                    </Badge>
                    <Badge variant="secondary">High Yield</Badge>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-2">
                    Viper Scalper Pro
                  </h1>
                  <p className="text-on-surface-variant flex items-center gap-2">
                    Risk Level:{" "}
                    <span className="text-on-surface font-semibold">
                      Medium (4/10)
                    </span>
                    <span className="flex gap-0.5 ml-2">
                      <span className="w-4 h-1 bg-primary rounded-full"></span>
                      <span className="w-4 h-1 bg-primary rounded-full"></span>
                      <span className="w-4 h-1 bg-primary rounded-full"></span>
                      <span className="w-4 h-1 bg-primary rounded-full"></span>
                      <span className="w-4 h-1 bg-surface-container-highest rounded-full"></span>
                      <span className="w-4 h-1 bg-surface-container-highest rounded-full"></span>
                      <span className="w-4 h-1 bg-surface-container-highest rounded-full"></span>
                      <span className="w-4 h-1 bg-surface-container-highest rounded-full"></span>
                      <span className="w-4 h-1 bg-surface-container-highest rounded-full"></span>
                      <span className="w-4 h-1 bg-surface-container-highest rounded-full"></span>
                    </span>
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2 px-4 py-2"
                    onClick={handleShare}
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Share className="w-4 h-4" />
                    )}
                    {isCopied
                      ? t("strategies.copied", "Copied!")
                      : t("strategies.share")}
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2 px-4 py-2"
                  >
                    <Bookmark className="w-4 h-4" />{" "}
                    {t("strategies.addToWatchlist")}
                  </Button>
                </div>
              </header>

              {/* Equity Chart Card */}
              <Card className="p-6 relative overflow-hidden group">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-[0.6875rem] font-medium uppercase text-on-surface-variant tracking-wider">
                      Equity Curve
                    </p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold text-on-surface">
                        $24,502.84
                      </h3>
                      <span className="text-primary font-bold">+145.02%</span>
                    </div>
                  </div>
                  <div className="flex bg-surface-container-lowest p-1 rounded-lg">
                    {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((tf) => (
                      <button
                        key={tf}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${tf === "3M" ? "bg-surface-container-highest text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chart Placeholder Visual */}
                <div className="h-[300px] w-full flex items-end gap-1 relative">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 1000 300"
                  >
                    <defs>
                      <linearGradient
                        id="chartGradient"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#4edea3"
                          stopOpacity="0.3"
                        ></stop>
                        <stop
                          offset="100%"
                          stopColor="#4edea3"
                          stopOpacity="0"
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,280 L50,260 L100,270 L150,240 L200,250 L250,210 L300,220 L350,180 L400,190 L450,150 L500,160 L550,120 L600,130 L650,90 L700,110 L750,70 L800,85 L850,50 L900,60 L950,20 L1000,40 V300 H0 Z"
                      fill="url(#chartGradient)"
                    ></path>
                    <path
                      className="sparkline-glow"
                      d="M0,280 L50,260 L100,270 L150,240 L200,250 L250,210 L300,220 L350,180 L400,190 L450,150 L500,160 L550,120 L600,130 L650,90 L700,110 L750,70 L800,85 L850,50 L900,60 L950,20 L1000,40"
                      fill="none"
                      stroke="#4edea3"
                      strokeWidth="3"
                    ></path>
                  </svg>
                  <div className="absolute left-0 bottom-0 text-[0.6rem] text-on-surface-variant opacity-50 flex w-full justify-between pb-2">
                    <span>AUG 12</span>
                    <span>SEP 12</span>
                    <span>OCT 12</span>
                    <span>NOV 12</span>
                  </div>
                </div>
              </Card>

              {/* KPI Stats Bar */}
              <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Sharpe Ratio", value: "1.8" },
                  { label: "Profit Factor", value: "2.1" },
                  { label: "Win Rate", value: "68%" },
                  { label: "Max Drawdown", value: "8.4%", isError: true },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-surface-container-high p-5 rounded-xl"
                  >
                    <p className="text-[0.6875rem] font-medium uppercase text-on-surface-variant mb-1">
                      {stat.label}
                    </p>
                    <h4
                      className={`text-2xl font-bold ${stat.isError ? "text-error" : "text-on-surface"}`}
                    >
                      {stat.value}
                    </h4>
                  </div>
                ))}
              </section>
            </>
          )}

          {/* Portfolio Analysis Section */}
          <section className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-on-surface mb-6">
                {t("strategies.assetAllocation")}
              </h3>
              <div className="flex items-center gap-8">
                <div className="relative w-32 h-32">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      fill="none"
                      r="16"
                      stroke="#222a3d"
                      strokeWidth="4"
                    ></circle>
                    <circle
                      cx="18"
                      cy="18"
                      fill="none"
                      r="16"
                      stroke="#4edea3"
                      strokeDasharray="45, 100"
                      strokeWidth="4"
                    ></circle>
                    <circle
                      cx="18"
                      cy="18"
                      fill="none"
                      r="16"
                      stroke="#adc6ff"
                      strokeDasharray="30, 100"
                      strokeDashoffset="-45"
                      strokeWidth="4"
                    ></circle>
                    <circle
                      cx="18"
                      cy="18"
                      fill="none"
                      r="16"
                      stroke="#ffb3ad"
                      strokeDasharray="25, 100"
                      strokeDashoffset="-75"
                      strokeWidth="4"
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-on-surface">
                      Forex
                    </span>
                    <span className="text-[0.6rem] text-on-surface-variant">
                      100%
                    </span>
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-xs">EURUSD</span>
                    </div>
                    <span className="text-xs font-bold">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary"></div>
                      <span className="text-xs">GBPJPY</span>
                    </div>
                    <span className="text-xs font-bold">30%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-tertiary"></div>
                      <span className="text-xs">Others</span>
                    </div>
                    <span className="text-xs font-bold">25%</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-bold text-on-surface mb-6">
                {t("strategies.tradingStyle")}
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-variant">
                      {t("strategies.scalpingIntensity")}
                    </span>
                    <span className="text-primary">
                      {t("strategies.veryHigh")}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[92%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-variant">
                      {t("strategies.avgHoldTime")}
                    </span>
                    <span className="text-on-surface">
                      4.2 {t("strategies.minutes")}
                    </span>
                  </div>
                  <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[15%]"></div>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {t("strategies.tradingStyleDesc")}
                </p>
              </div>
            </Card>
          </section>

          {/* Recent Trades Table */}
          <Card className="overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-bold text-on-surface">
                {t("strategies.recentExecutions")}
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-highest/50 text-[0.6875rem] font-medium uppercase tracking-wider text-on-surface-variant">
                    <th className="px-6 py-3">{t("strategies.symbol")}</th>
                    <th className="px-6 py-3">{t("strategies.type")}</th>
                    <th className="px-6 py-3">{t("strategies.lots")}</th>
                    <th className="px-6 py-3">{t("strategies.openPrice")}</th>
                    <th className="px-6 py-3 text-right">
                      {t("strategies.profit")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-highest/30">
                  {[
                    {
                      sym: "EURUSD",
                      type: "BUY",
                      lots: "2.50",
                      price: "1.08422",
                      profit: "+$412.50",
                      pct: "+0.18%",
                      isWin: true,
                    },
                    {
                      sym: "GBPJPY",
                      type: "SELL",
                      lots: "1.80",
                      price: "184.215",
                      profit: "-$84.20",
                      pct: "-0.04%",
                      isWin: false,
                    },
                    {
                      sym: "EURUSD",
                      type: "BUY",
                      lots: "2.50",
                      price: "1.08390",
                      profit: "+$325.00",
                      pct: "+0.14%",
                      isWin: true,
                    },
                  ].map((trade, i) => (
                    <tr
                      key={i}
                      className="hover:bg-surface-container-highest/20 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-semibold">
                        {trade.sym}
                      </td>
                      <td
                        className={`px-6 py-4 text-sm ${trade.isWin ? "text-primary" : "text-tertiary"}`}
                      >
                        {trade.type}
                      </td>
                      <td className="px-6 py-4 text-sm">{trade.lots}</td>
                      <td className="px-6 py-4 text-sm font-mono">
                        {trade.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-right">
                        <div
                          className={`font-bold ${trade.isWin ? "text-primary" : "text-tertiary"}`}
                        >
                          {trade.profit}
                        </div>
                        <div className="text-[0.6875rem] text-on-surface-variant">
                          {trade.pct}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column: Sticky Sidebar (4/12) */}
        <div className="xl:col-span-4">
          <div className="sticky top-24 space-y-6">
            {/* Investment Panel */}
            <Card variant="glass" className="p-8">
              <h3 className="text-xl font-bold text-on-surface mb-6">
                {t("strategies.investInStrategy")}
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[0.6875rem] font-bold uppercase text-on-surface-variant tracking-widest block mb-2">
                    {t("strategies.investmentAmount")}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
                      $
                    </span>
                    <input
                      type="number"
                      min={0}
                      value={investmentAmount}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val) && val >= 0) setInvestmentAmount(val);
                      }}
                      className="w-full bg-surface-container-highest border-none rounded-xl py-4 pl-8 pr-4 text-on-surface font-bold text-lg focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
                    />
                  </div>
                </div>

                {(() => {
                  const monthlyRate = (strategy?.monthly_return ?? 0) / 100;
                  const finalBalance =
                    investmentAmount * Math.pow(1 + monthlyRate, 12);
                  const profit = finalBalance - investmentAmount;
                  const pct =
                    investmentAmount > 0
                      ? (finalBalance / investmentAmount - 1) * 100
                      : 0;
                  const isPositive = profit >= 0;
                  return (
                    <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
                      <p className="text-[0.6875rem] font-medium uppercase text-on-surface-variant mb-4">
                        {t("strategies.projectedReturns")}
                      </p>
                      <div className="flex justify-between items-end">
                        <div>
                          <p
                            className={`text-3xl font-bold ${isPositive ? "text-primary" : "text-tertiary"}`}
                          >
                            {isPositive ? "+" : ""}$
                            {profit.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                          <p className="text-xs text-on-surface-variant">
                            {t("strategies.estBalance")}: $
                            {finalBalance.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-xs px-2 py-1 rounded font-bold ${isPositive ? "bg-primary/10 text-primary" : "bg-tertiary/10 text-tertiary"}`}
                          >
                            {isPositive ? "+" : ""}
                            {pct.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <ul className="divide-y divide-outline-variant/10 rounded-xl overflow-hidden border border-outline-variant/10">
                  <li className="flex items-center justify-between px-4 py-3 bg-surface-container-lowest">
                    <span className="text-xs text-on-surface-variant">
                      {t("strategies.performanceFee")}
                    </span>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-lg">
                        {strategy?.performance_fee ?? 20}%
                      </span>
                      <span className="text-[0.6rem] text-on-surface-variant mt-0.5">
                        {t("strategies.ofProfits")}
                      </span>
                    </div>
                  </li>
                  <li className="flex items-center justify-between px-4 py-3 bg-surface-container-lowest">
                    <span className="text-xs text-on-surface-variant">
                      {t("strategies.minimumTerm")}
                    </span>
                    <span className="text-sm font-semibold text-on-surface">
                      {strategy?.minimum_term?.toLowerCase() === "liquid"
                        ? t("strategies.liquid")
                        : (strategy?.minimum_term ?? t("strategies.liquid"))}
                    </span>
                  </li>
                  <li className="flex items-center justify-between px-4 py-3 bg-surface-container-lowest">
                    <span className="text-xs text-on-surface-variant">
                      {t("strategies.totalInvestors")}
                    </span>
                    <span className="text-sm font-semibold text-on-surface">
                      {strategy ? strategy.investors.toLocaleString() : "–"}
                    </span>
                  </li>
                </ul>

                <Button
                  className="w-full py-4 text-lg"
                  onClick={() => {
                    if (!session) {
                      onNavigate("auth");
                    } else {
                      setShowComingSoonModal(true);
                    }
                  }}
                >
                  {t("strategies.confirmInvestment")}
                </Button>
                <p className="text-[0.6rem] text-center text-on-surface-variant opacity-60 px-4">
                  {t("strategies.riskWarning")}
                </p>
              </div>
            </Card>

            {/* Meta Info Card */}
            <Card className="p-6 border border-outline-variant/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                  <Landmark />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">
                    Viper Trading Lab
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Established 2018 • Zurich
                  </p>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Viper Trading Lab is a premier algorithmic quant house
                specialized in FX scalping and HFT strategies with over $50M
                AUM.
              </p>
              <Button
                variant="outline"
                className="w-full py-2 text-xs text-secondary border-secondary/20 hover:bg-secondary/5"
              >
                {t("strategies.viewFirmProfile")}
              </Button>
            </Card>
          </div>
        </div>
      </div>
      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setShowComingSoonModal(false)}
        >
          <div
            className="relative bg-surface-container rounded-2xl p-10 max-w-md w-full shadow-2xl border border-outline-variant/20 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
              onClick={() => setShowComingSoonModal(false)}
              aria-label={t("strategies.close")}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-on-surface">
                {t("strategies.comingSoonTitle")}
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {t("strategies.comingSoonDesc")}
            </p>
            <div className="pt-1">
              <Button
                className="w-full py-5 text-base"
                onClick={() => {
                  setShowComingSoonModal(false);
                  onNavigate("contact", strategy?.name);
                }}
              >
                {t("strategies.goToContact")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

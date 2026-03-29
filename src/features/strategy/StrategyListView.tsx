import React, { useState, useEffect } from "react";
import { Search, Loader2, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { StrategyCard, Strategy } from "./StrategyCard";
import { CustomSelect } from "@/components/ui/custom-select";

interface StrategyListViewProps {
  onNavigate: (view: string, id?: string) => void;
}

export function StrategyListView({ onNavigate }: StrategyListViewProps) {
  const { t } = useTranslation();
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [assetFilter, setAssetFilter] = useState("all");
  const [returnFilter, setReturnFilter] = useState("all");

  useEffect(() => {
    async function fetchStrategies() {
      if (!isSupabaseConfigured) {
        console.warn("Supabase is not configured. Showing mock data.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("trading_strategies")
          .select("*")
          .eq("is_visible", true)
          .order("monthly_return", { ascending: false });

        if (error) {
          console.error("Supabase Error:", error.message, error.details);
          throw error;
        }

        console.log(
          "Strategies fetched successfully:",
          data?.length || 0,
          "rows",
        );
        setStrategies(data || []);
      } catch (err: any) {
        console.error("Error fetching strategies:", err.message || err);
      } finally {
        setLoading(false);
      }
    }

    fetchStrategies();
  }, []);

  const filteredStrategies = strategies.filter((strategy) => {
    // Search filter
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = strategy.name.toLowerCase().includes(searchLower);
    const displayNameMatch = strategy.display_name
      ?.toLowerCase()
      .includes(searchLower);

    if (searchTerm && !nameMatch && !displayNameMatch) {
      return false;
    }

    // Risk filter
    if (riskFilter !== "all") {
      const drawdownValue = Math.abs(Number(strategy.drawdown));
      const isMinimal = drawdownValue <= 20;
      const isLow = drawdownValue > 20 && drawdownValue <= 40;
      const isModerate = drawdownValue > 40 && drawdownValue <= 60;
      const isHigh = drawdownValue > 60 && drawdownValue <= 80;
      const isExtreme = drawdownValue > 80;

      if (riskFilter === "minimal" && !isMinimal) return false;
      if (riskFilter === "low" && !isLow) return false;
      if (riskFilter === "moderate" && !isModerate) return false;
      if (riskFilter === "high" && !isHigh) return false;
      if (riskFilter === "extreme" && !isExtreme) return false;
    }

    // Return filter
    if (returnFilter !== "all") {
      const returnVal = Number(returnFilter);
      if (strategy.monthly_return < returnVal) return false;
    }

    // Asset filter (mock implementation since asset_type might not be in DB)
    if (assetFilter !== "all") {
      // If we had an asset_type field, we would filter here.
      // For now, we'll just let it pass or you can implement custom logic.
    }

    return true;
  });

  return (
    <main className="pt-20 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 max-w-[1600px] mx-auto min-h-screen">
      {/* Header Section */}
      <header className="mb-10 sm:mb-16 max-w-3xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight mb-4">
          {t("strategies.title")}
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          {t("strategies.subtitle")}
        </p>
      </header>

      {/* Search & Filter Bar */}
      <section className="mb-8 sm:mb-12">
        <div className="bg-surface-container-low rounded-xl p-4 sm:p-6 flex flex-col gap-4">
          {/* Search Input */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
            <input
              className="w-full bg-surface-container-highest border-none rounded-lg py-3 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-secondary/20 transition-all outline-none"
              placeholder={t("strategies.searchPlaceholder")}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters Group */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-on-surface-variant ml-1">
                {t("strategies.riskLevel")}
              </span>
              <CustomSelect
                size="sm"
                value={riskFilter}
                onChange={setRiskFilter}
                options={[
                  { value: "all", label: t("strategies.allRisks") },
                  { value: "minimal", label: t("strategies.minimal") },
                  { value: "low", label: t("strategies.low") },
                  { value: "moderate", label: t("strategies.moderate") },
                  { value: "high", label: t("strategies.high") },
                  { value: "extreme", label: t("strategies.extreme") },
                ]}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-on-surface-variant ml-1">
                {t("strategies.assetType")}
              </span>
              <CustomSelect
                size="sm"
                value={assetFilter}
                onChange={setAssetFilter}
                options={[
                  { value: "all", label: t("strategies.allAssets") },
                  { value: "majors", label: t("strategies.majors") },
                  { value: "minors", label: t("strategies.minors") },
                  { value: "exotics", label: t("strategies.exotics") },
                ]}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-on-surface-variant ml-1">
                {t("strategies.returnRange")}
              </span>
              <CustomSelect
                size="sm"
                value={returnFilter}
                onChange={setReturnFilter}
                options={[
                  { value: "all", label: t("strategies.anyReturn") },
                  { value: "5", label: "5%+" },
                  { value: "15", label: "15%+" },
                  { value: "25", label: "25%+" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : filteredStrategies.length > 0 ? (
          filteredStrategies.map((strategy) => (
            <StrategyCard
              key={strategy.id}
              strategy={strategy}
              onClick={() => onNavigate("strategy-detail", strategy.id)}
            />
          ))
        ) : strategies.length > 0 ? (
          <div className="col-span-full text-center py-12 bg-surface-container-low rounded-xl border border-outline-variant/10">
            <p className="text-on-surface-variant mb-4">
              {t("strategies.noFilterResults")}
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setRiskFilter("all");
                setAssetFilter("all");
                setReturnFilter("all");
              }}
              className="mt-4 text-primary font-bold hover:underline"
            >
              {t("strategies.clearFilters")}
            </button>
          </div>
        ) : !isSupabaseConfigured ? (
          // Fallback static cards only if NOT configured
          <>
            {/* Strategy Card 1 */}
            <div className="bg-surface-container-low group hover:bg-surface-container transition-all duration-300 rounded-xl overflow-hidden flex flex-col">
              <div className="p-8 pb-4">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[0.6875rem] uppercase tracking-wider font-bold text-primary mb-1 block">
                      Institutional
                    </span>
                    <h3 className="text-xl font-bold text-on-surface">
                      Alpha Scalper
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-tertiary-container/10 text-tertiary text-[0.6875rem] font-bold rounded-full border border-tertiary/20">
                    {t("dashboard.highRisk").toUpperCase()}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 mb-6">
                  <div>
                    <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-on-surface-variant block mb-1">
                      {t("dashboard.monthlyReturn")}
                    </span>
                    <span className="text-3xl font-bold text-primary">
                      +12.4%
                    </span>
                  </div>
                  {/* Mock Sparkline */}
                  <div className="h-12 w-32 flex items-end gap-1">
                    <div className="w-full bg-primary/20 h-1/4 rounded-t-sm"></div>
                    <div className="w-full bg-primary/20 h-2/4 rounded-t-sm"></div>
                    <div className="w-full bg-primary/40 h-3/4 rounded-t-sm"></div>
                    <div className="w-full bg-primary/60 h-2/4 rounded-t-sm"></div>
                    <div className="w-full bg-primary/80 h-full rounded-t-sm shadow-[0_0_8px_rgba(78,222,163,0.3)]"></div>
                  </div>
                </div>
              </div>
              <div className="mt-auto px-8 pb-8">
                <button
                  onClick={() => onNavigate("strategy-detail", "static-1")}
                  className="w-full bg-gradient-to-br from-primary to-[#10b981] text-on-primary py-3 rounded-lg font-bold flex items-center justify-center gap-2 group-hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all active:scale-95"
                >
                  {t("strategies.exploreStrategy")}{" "}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="col-span-full text-center py-12 bg-surface-container-low rounded-xl border border-outline-variant/10">
            <p className="text-on-surface-variant">
              {t("strategies.noStrategiesFound")}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

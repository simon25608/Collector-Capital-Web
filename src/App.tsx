import { useState, useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { AuthView } from "./features/auth/AuthView";
import { DashboardView } from "./features/dashboard/DashboardView";
import { StrategyListView } from "./features/strategy/StrategyListView";
import { StrategyDetailView } from "./features/strategy/StrategyDetailView";
import { SupportView } from "./features/support/SupportView";
import { ContactView } from "./features/contact/ContactView";
import { LegalView } from "./features/legal/LegalView";
import { ProfileView } from "./features/profile/ProfileView";
import { WatchlistView } from "./features/watchlist/WatchlistView";
import { supabase, isSupabaseConfigured } from "./lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function App() {
  const [currentView, setView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("view") || "dashboard";
  });
  const [selectedStrategyId, setSelectedStrategyId] = useState<
    string | undefined
  >(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id") || undefined;
  });
  const [contactPreselect, setContactPreselect] = useState<
    string | undefined
  >();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const handleNavigate = (view: string, id?: string) => {
    setView(view);
    window.scrollTo(0, 0);

    if (view === "contact" && id) {
      setContactPreselect(id);
    } else if (view !== "contact") {
      setContactPreselect(undefined);
    }

    const url = new URL(window.location.href);
    url.searchParams.set("view", view);

    if (id) {
      setSelectedStrategyId(id);
      url.searchParams.set("id", id);
    } else {
      setSelectedStrategyId(undefined);
      url.searchParams.delete("id");
    }

    window.history.pushState({}, "", url);
  };

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      setView(params.get("view") || "dashboard");
      setSelectedStrategyId(params.get("id") || undefined);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface text-on-surface">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface selection:bg-primary/30">
      <Navbar
        currentView={currentView}
        setView={handleNavigate}
        session={session}
      />

      <div className="flex-grow">
        {currentView === "auth" && <AuthView setView={handleNavigate} />}
        {currentView === "dashboard" && (
          <DashboardView onNavigate={handleNavigate} />
        )}
        {currentView === "strategies" && (
          <StrategyListView onNavigate={handleNavigate} />
        )}
        {currentView === "strategy-detail" && (
          <StrategyDetailView
            onNavigate={handleNavigate}
            strategyId={selectedStrategyId}
          />
        )}
        {currentView === "support" && (
          <SupportView onNavigate={handleNavigate} />
        )}
        {currentView === "contact" && (
          <ContactView
            onNavigate={handleNavigate}
            preselectedStrategy={contactPreselect}
          />
        )}
        {currentView === "legal" && <LegalView setView={handleNavigate} />}
        {currentView === "profile" && <ProfileView />}
        {currentView === "watchlist" && (
          <WatchlistView onNavigate={handleNavigate} />
        )}
      </div>

      <Footer setView={handleNavigate} />
    </div>
  );
}

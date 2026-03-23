import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AuthView } from './features/auth/AuthView';
import { DashboardView } from './features/dashboard/DashboardView';
import { StrategyListView } from './features/strategy/StrategyListView';
import { StrategyDetailView } from './features/strategy/StrategyDetailView';
import { SupportView } from './features/support/SupportView';
import { ContactView } from './features/contact/ContactView';
import { LegalView } from './features/legal/LegalView';

export default function App() {
  const [currentView, setView] = useState('dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface selection:bg-primary/30">
      <Navbar currentView={currentView} setView={setView} />
      
      <div className="flex-grow">
        {currentView === 'auth' && <AuthView setView={setView} />}
        {currentView === 'dashboard' && <DashboardView onNavigate={setView} />}
        {currentView === 'strategies' && <StrategyListView onNavigate={setView} />}
        {currentView === 'strategy-detail' && <StrategyDetailView onNavigate={setView} />}
        {currentView === 'support' && <SupportView onNavigate={setView} />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'legal' && <LegalView setView={setView} />}
      </div>

      <Footer />
    </div>
  );
}

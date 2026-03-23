import { Bell, Settings, User, Search, Landmark, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from 'react-i18next';

export function Navbar({ currentView, setView }: { currentView: string, setView: (view: string) => void }) {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md flex items-center justify-between px-8 h-16 border-b border-white/5">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('dashboard')}>
          <Landmark className="text-primary w-6 h-6" />
          <span className="text-xl font-bold tracking-tighter text-on-surface">CollectorCapital</span>
        </div>
        <div className="hidden md:flex gap-6">
          <button 
            onClick={() => setView('dashboard')}
            className={`font-medium transition-colors duration-200 px-3 py-1 rounded ${currentView === 'dashboard' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}
          >
            {t('navbar.dashboard')}
          </button>
          <button 
            onClick={() => setView('strategies')}
            className={`font-medium transition-colors duration-200 px-3 py-1 rounded ${currentView === 'strategies' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}
          >
            {t('navbar.strategies')}
          </button>
          <button 
            onClick={() => setView('support')}
            className={`font-medium transition-colors duration-200 px-3 py-1 rounded ${currentView === 'support' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}
          >
            {t('navbar.support')}
          </button>
          <button 
            onClick={() => setView('contact')}
            className={`font-medium transition-colors duration-200 px-3 py-1 rounded ${currentView === 'contact' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}
          >
            {t('navbar.contact')}
          </button>
          <button 
            onClick={() => setView('legal')}
            className={`font-medium transition-colors duration-200 px-3 py-1 rounded ${currentView === 'legal' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}
          >
            {t('navbar.legal')}
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-1 text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest px-2 py-1.5 rounded transition-colors"
          title="Toggle Language"
        >
          <Globe className="w-4 h-4" />
          {i18n.language === 'en' ? 'EN' : 'ES'}
        </button>
        {currentView !== 'auth' && (
          <>
            <div className="hidden md:flex items-center bg-surface-container-high rounded-lg px-3 py-1.5 gap-2">
              <Search className="text-on-surface-variant w-4 h-4" />
              <input 
                type="text" 
                placeholder={t('navbar.search')} 
                className="bg-transparent border-none text-sm text-on-surface focus:ring-0 placeholder:text-on-surface-variant w-48 outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="text-on-surface-variant hover:bg-surface-container-highest p-2 rounded-full transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="text-on-surface-variant hover:bg-surface-container-highest p-2 rounded-full transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
            <Button className="px-6 py-2">{t('navbar.trade')}</Button>
            <button onClick={() => setView('auth')} className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-outline-variant/30 hover:border-primary/50 transition-colors">
              <User className="w-5 h-5 text-on-surface-variant" />
            </button>
          </>
        )}
        {currentView === 'auth' && (
          <Button onClick={() => setView('dashboard')} className="px-5 py-2">{t('navbar.signIn')}</Button>
        )}
      </div>
    </nav>
  )
}

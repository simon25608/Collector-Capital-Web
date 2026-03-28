import { Bell, Settings, User, Search, Landmark, Globe, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from 'react-i18next';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useState, useRef, useEffect } from 'react';

export function Navbar({ currentView, setView, session }: { currentView: string, setView: (view: string, id?: string) => void, session: Session | null }) {
  const { t, i18n } = useTranslation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setView('dashboard');
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
            {/* Search bar hidden for now */}
            <div className="hidden items-center bg-surface-container-high rounded-lg px-3 py-1.5 gap-2">
              <Search className="text-on-surface-variant w-4 h-4" />
              <input 
                type="text" 
                placeholder={t('navbar.search')} 
                className="bg-transparent border-none text-sm text-on-surface focus:ring-0 placeholder:text-on-surface-variant w-48 outline-none"
              />
            </div>
            {session && (
              <div className="flex items-center gap-2">
                <div className="relative" ref={notificationRef}>
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`p-2 rounded-full transition-colors ${showNotifications ? 'bg-surface-container-highest text-on-surface' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}
                  >
                    <Bell className="w-5 h-5" />
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-surface-container-high border border-outline-variant/20 rounded-xl shadow-2xl overflow-hidden z-50">
                      <div className="p-4 border-b border-outline-variant/10">
                        <h3 className="font-semibold text-on-surface">{t('navbar.notifications')}</h3>
                      </div>
                      <div className="p-8 text-center flex flex-col items-center justify-center">
                        <Bell className="w-8 h-8 text-on-surface-variant/30 mb-3" />
                        <p className="text-on-surface-variant text-sm">{t('navbar.noNotifications')}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative" ref={settingsRef}>
                  <button 
                    onClick={() => setShowSettings(!showSettings)}
                    className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-surface-container-highest text-on-surface' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}
                    title={t('navbar.settings')}
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                  
                  {showSettings && (
                    <div className="absolute right-0 mt-2 w-56 bg-surface-container-high border border-outline-variant/20 rounded-xl shadow-2xl overflow-hidden z-50">
                      <div className="p-2 flex flex-col gap-1">
                        <button 
                          onClick={() => { setView('profile'); setShowSettings(false); }} 
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-highest rounded-lg transition-colors"
                        >
                          {t('navbar.profileSettings')}
                        </button>
                        <button 
                          onClick={() => { setView('watchlist'); setShowSettings(false); }} 
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-highest rounded-lg transition-colors"
                        >
                          {t('navbar.myWatchlist')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            {session ? (
              <div className="flex items-center gap-4 ml-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-on-surface hidden lg:block">
                    {session.user.email}
                  </span>
                </div>
                <button 
                  onClick={handleSignOut}
                  className="text-on-surface-variant hover:text-error hover:bg-error/10 p-2 rounded-full transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Button onClick={() => setView('auth')} className="px-6 py-2 ml-2">
                {t('navbar.signIn')}
              </Button>
            )}
          </>
        )}
        {currentView === 'auth' && !session && (
          <Button onClick={() => setView('dashboard')} className="px-5 py-2">{t('navbar.signIn')}</Button>
        )}
      </div>
    </nav>
  )
}

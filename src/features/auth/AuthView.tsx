import { Building2, Eye, CheckCircle2 } from "lucide-react"
import { useTranslation } from 'react-i18next';

interface AuthViewProps {
  setView: (view: string) => void;
}

export function AuthView({ setView }: AuthViewProps) {
  const { t } = useTranslation();

  return (
    <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-stretch gap-12 min-h-[870px] pt-24">
      {/* Background Layer */}
      <div className="fixed inset-0 grid-pattern pointer-events-none"></div>
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Left Column */}
      <section className="hidden md:flex flex-1 flex-col justify-between p-12 rounded-3xl bg-surface-container-low relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,100 Q100,50 200,100 T400,100" fill="none" stroke="#4edea3" strokeWidth="0.5"></path>
            <path d="M0,150 Q120,100 240,150 T400,150" fill="none" stroke="#4edea3" strokeWidth="0.5"></path>
            <path d="M0,200 Q80,250 160,200 T400,200" fill="none" stroke="#4edea3" strokeWidth="0.5"></path>
          </svg>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-16">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="text-on-primary w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-on-surface">ForexCapital</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-on-surface mb-6">
            {t('auth.joinTitle')} <span className="text-primary">{t('auth.joinHighlight')}</span> {t('auth.joinSuffix')}
          </h1>
          <p className="text-on-surface-variant text-lg max-w-md leading-relaxed">
            {t('auth.joinSubtitle')}
          </p>
        </div>
        <div className="relative z-10 mt-auto pt-12 border-t border-outline-variant/15">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex -space-x-3">
              <img alt="User" className="w-10 h-10 rounded-full border-2 border-surface-container-low" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5wk0qZjJWKmdGBqDr3rulheyavN48-xEKVRYjXG00UBG3YFm--oPCyk8UJF255UAPeT_Fq_s5EfepjYlZHM4KVJMBncC53rWpj0I0eAbPeeoAyUUwFhF7hPhuMhw5U4w2kZT2Fr_5AT6pMhjLp9j1cnQB3oQVCIfVEO0tbkV3s1BbHmEJNHDZbc7BFgEVLKDzULxyag6CyWkB842uMUX71bIEuP47ZWTn_FfaZWeWwltwv_OxXlK184Mu1AMCH08IVourzYV27kY"/>
              <img alt="User" className="w-10 h-10 rounded-full border-2 border-surface-container-low" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhloHRIe7u76z4-cWCwxaX-09ODDwhT50-9A64laByYDusojUft9b9b7cfMY12pJMVzLf9tK5J_kjBTrPHZEaZ8xU0nq-zq-eqf0lIaSgnEUNEEV7ESFddpqwtalafNM126zlBfsntoYC3Se_GYCkZ1k3Rq6EiBXNBtCmNLtcTT95WmLefXTMiRkL0geHMVdnn_8ZuW-IP5MOXyR5IllLN6OWGF2WFk5G5_fpvzeC9fgXNVYS-R0MMMwQkTaE7stOsetmkA-I6JWM"/>
              <img alt="User" className="w-10 h-10 rounded-full border-2 border-surface-container-low" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxrg8WMgpxHKcOF4iFLBxJd0SPqb0mCEOlRMO5Qt0W-MbPeFG8psszQ2ddOYjvONpAm8Vf3SeBLdXlUkzixTTLa5TUJsFKxrwVeka02BToQjUrF5h1TJQGlTfQAIT4jPR85tOorJ_bWO74HH-jPMbVQx0GgfIELBxFtY6cGdW4-GdRDqfWdemwbhfRWjho-FRzt5XfbFUoiP9ePoGQ1n7rgC7ES5hRiJ-itugkXpaH0ZpUeJlfUS80KDtMtSBu58pmy6zcKzDTgyo"/>
            </div>
            <span className="text-sm font-medium text-on-surface">{t('auth.trustedBy')}</span>
          </div>
          <p className="italic text-on-surface-variant text-sm">
            {t('auth.testimonial')}
          </p>
        </div>
      </section>

      {/* Right Column */}
      <section className="flex-1 flex flex-col justify-center relative z-10">
        <div className="w-full max-w-md mx-auto">
          <div className="md:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Building2 className="text-on-primary w-4 h-4" />
            </div>
            <span className="text-xl font-black tracking-tighter text-on-surface">ForexCapital</span>
          </div>
          <header className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2">{t('auth.createAccount')}</h2>
            <p className="text-on-surface-variant">{t('auth.secureAccess')}</p>
          </header>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-colors border border-outline-variant/10">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.92 3.32-2.12 4.4-1.32 1.32-3.4 2.68-6.92 2.68-5.76 0-10.36-4.64-10.36-10.36s4.6-10.36 10.36-10.36c3.12 0 5.4 1.2 7.08 2.84l2.32-2.32c-2.44-2.32-5.64-3.64-9.4-3.64-7.84 0-14.28 6.44-14.28 14.28s6.44 14.28 14.28 14.28c4.24 0 7.44-1.4 9.88-3.92 2.52-2.52 3.32-6.04 3.32-8.76 0-.84-.08-1.44-.16-2.08h-13.04z" fill="#EA4335"></path>
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-colors border border-outline-variant/10">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.96.95-2.22 1.72-3.72 1.72-1.47 0-2.45-.65-3.32-.65-.88 0-2.03.68-3.33.68-2.55 0-4.67-3.92-4.67-7.14 0-3.37 2.12-5.18 4.12-5.18 1.05 0 1.9.52 2.73.52.82 0 1.55-.55 2.85-.55.97 0 1.95.38 2.72 1.08-2.18 1.15-1.83 4.15.42 5.15-.43 1.57-1.3 3.33-2.82 4.37zm-2.87-14.9c-.1.01-.2.01-.3.01-1.35 0-2.56-1.1-2.46-2.44.1-.01.2-.01.31-.01 1.35 0 2.45 1.17 2.45 2.44z"></path>
              </svg>
              <span className="text-sm font-medium">Apple</span>
            </button>
          </div>

          <div className="relative flex py-5 items-center mb-4">
            <div className="flex-grow border-t border-outline-variant/15"></div>
            <span className="flex-shrink mx-4 text-on-surface-variant text-xs font-medium uppercase tracking-widest">{t('auth.orEmail')}</span>
            <div className="flex-grow border-t border-outline-variant/15"></div>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setView('dashboard'); }}>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-2 ml-1">{t('auth.fullName')}</label>
              <input className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-secondary/20 transition-all placeholder:text-outline/50 text-on-surface" placeholder="Alex Sterling" type="text" />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-2 ml-1">{t('auth.email')}</label>
              <input className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-secondary/20 transition-all placeholder:text-outline/50 text-on-surface" placeholder="alex@forexcapital.com" type="email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface-variant mb-2 ml-1">{t('auth.password')}</label>
              <div className="relative">
                <input className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-secondary/20 transition-all placeholder:text-outline/50 text-on-surface pr-12" placeholder="••••••••••••" type="password" />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/60 hover:text-on-surface transition-colors" type="button">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-3 flex gap-1.5 px-1">
                <div className="h-1 flex-1 rounded-full bg-primary"></div>
                <div className="h-1 flex-1 rounded-full bg-primary"></div>
                <div className="h-1 flex-1 rounded-full bg-primary"></div>
                <div className="h-1 flex-1 rounded-full bg-surface-bright"></div>
              </div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-primary mt-2 ml-1">{t('auth.strongSecurity')}</p>
            </div>
            <div className="flex items-start gap-3 px-1">
              <div className="flex items-center h-5">
                <input type="checkbox" id="terms" className="w-4 h-4 rounded bg-surface-container-highest border-outline-variant/30 text-primary focus:ring-offset-background focus:ring-primary" />
              </div>
              <label htmlFor="terms" className="text-sm text-on-surface-variant leading-tight">
                {t('auth.iAgree')} <a href="#" className="text-secondary hover:underline">{t('auth.terms')}</a> {t('auth.and')} <a href="#" className="text-secondary hover:underline">{t('auth.privacy')}</a>.
              </label>
            </div>
            <button className="w-full bg-gradient-to-br from-primary to-primary-container py-4 rounded-xl font-bold text-on-primary-container text-lg shadow-xl shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all" type="submit">
              {t('auth.createBtn')}
            </button>
          </form>
          <footer className="mt-10 text-center">
            <p className="text-on-surface-variant text-sm">
              {t('auth.alreadyHave')} 
              <a href="#" className="text-primary font-semibold hover:underline ml-1" onClick={(e) => { e.preventDefault(); setView('dashboard'); }}>{t('auth.signIn')}</a>
            </p>
          </footer>
        </div>
      </section>

      {/* Security Badge */}
      <div className="fixed bottom-8 right-8 hidden lg:flex items-center gap-2 bg-surface-container-high/50 backdrop-blur-md px-4 py-2 rounded-full border border-outline-variant/10">
        <CheckCircle2 className="text-primary w-5 h-5" />
        <span className="text-xs font-medium text-on-surface/70 uppercase tracking-widest">{t('auth.encryption')}</span>
      </div>
    </main>
  )
}

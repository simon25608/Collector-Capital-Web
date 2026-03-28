import { useTranslation } from 'react-i18next';

export function Footer({ setView }: { setView: (view: string) => void }) {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/10 py-12 px-8 mt-auto">
      <div className="w-full flex flex-col md:flex-row justify-between gap-8">
        <div className="flex flex-col gap-4 max-w-xl lg:max-w-2xl">
          <div className="text-sm font-bold text-on-surface">Collector Capital</div>
          <p className="text-[11px] uppercase tracking-widest text-on-surface-variant leading-loose">
            {t('footer.rights')}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <button onClick={() => setView('legal')} className="text-left text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 opacity-80 hover:opacity-100 transition-opacity">{t('footer.terms')}</button>
          <button onClick={() => setView('legal')} className="text-left text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 opacity-80 hover:opacity-100 transition-opacity">{t('footer.privacy')}</button>
          <button onClick={() => setView('legal')} className="text-left text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 opacity-80 hover:opacity-100 transition-opacity">{t('footer.risk')}</button>
          <button onClick={() => setView('support')} className="text-left text-[11px] uppercase tracking-widest text-on-surface-variant hover:text-primary hover:underline decoration-primary underline-offset-4 opacity-80 hover:opacity-100 transition-opacity">{t('footer.contact')}</button>
        </div>
      </div>
    </footer>
  )
}

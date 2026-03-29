import { Mail, MessageSquare, Phone, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface ContactViewProps {
  onNavigate?: (view: string) => void;
}

export function ContactView({ onNavigate }: ContactViewProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [strategies, setStrategies] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStrategies() {
      if (!isSupabaseConfigured) return;
      try {
        const { data, error } = await supabase
          .from('trading_strategies')
          .select('name, display_name')
          .eq('is_visible', true)
          .order('name', { ascending: true });
        if (!error && data) {
          setStrategies(data);
        }
      } catch (err) {
        console.error('Error fetching strategies:', err);
      }
    }
    fetchStrategies();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captchaToken) {
      setError('Please complete the CAPTCHA to proceed.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message || 'An error occurred while sending your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24 pb-12">
      {/* Section 1: Hero */}
      <section className="relative py-16 px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-primary font-medium tracking-[0.2em] uppercase text-[11px] mb-4 block">{t('contact.institutionalAccess')}</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-on-surface">{t('contact.title')}</h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Section 2: Form & Channels */}
      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="bg-surface-container-low p-8 md:p-12 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-semibold mb-8">{t('contact.directInquiry')}</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {success && (
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-3 text-primary">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-medium">{t('contact.success')}</span>
                </div>
              )}
              {error && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-xl text-error text-sm">
                  {error}
                </div>
              )}
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest text-on-surface-variant font-medium">{t('contact.fullName')}</label>
                  <Input name="name" placeholder="John Doe" type="text" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest text-on-surface-variant font-medium">{t('contact.email')}</label>
                  <Input name="email" placeholder="john@institutional.com" type="email" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-on-surface-variant font-medium">{t('contact.strategyInterest')}</label>
                <select name="subject" required className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3.5 text-on-surface focus:ring-2 focus:ring-secondary/20 outline-none transition-all appearance-none">
                  {strategies.length > 0 ? (
                    strategies.map((s, i) => (
                      <option key={i} value={s.name}>{s.display_name || s.name}</option>
                    ))
                  ) : (
                    <>
                      <option>{t('contact.forexSpot')}</option>
                      <option>{t('contact.fixedIncome')}</option>
                      <option>{t('contact.algoTrading')}</option>
                      <option>{t('contact.portfolioAdvisory')}</option>
                    </>
                  )}
                  <option value="Other">{t('contact.other')}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-on-surface-variant font-medium">{t('contact.message')}</label>
                <textarea 
                  name="message"
                  required
                  className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3.5 text-on-surface focus:ring-2 focus:ring-secondary/20 outline-none transition-all" 
                  placeholder={t('contact.messagePlaceholder')} 
                  rows={4}
                ></textarea>
              </div>
              
              <div className="flex justify-center py-2">
                <Turnstile 
                  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAACxRmsEjj__pSQit'} 
                  onSuccess={setCaptchaToken}
                  options={{ theme: 'dark' }}
                />
              </div>

              <Button className="w-full py-4 text-sm tracking-widest uppercase flex items-center justify-center gap-2" type="submit" disabled={loading || !captchaToken}>
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {t('contact.submit')}
              </Button>
            </form>
          </div>

          {/* Support Channels */}
          <div className="space-y-8">
            <div className="group p-8 bg-surface-container-high rounded-xl hover:bg-surface-bright transition-all cursor-pointer">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{t('contact.priorityEmail')}</h3>
                  <p className="text-on-surface-variant text-sm mb-3">{t('contact.emailResponse')}</p>
                </div>
              </div>
            </div>
            
            <div className="group p-8 bg-surface-container-high rounded-xl hover:bg-surface-bright transition-all cursor-pointer">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{t('contact.liveChat')}</h3>
                  <p className="text-on-surface-variant text-sm mb-3">{t('contact.chatResponse')}</p>
                  <button 
                    type="button"
                    onClick={() => onNavigate && onNavigate('auth')}
                    className="text-secondary font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    {t('contact.startSession')} &rarr;
                  </button>
                </div>
              </div>
            </div>

            <div className="group p-8 bg-surface-container-high rounded-xl hover:bg-surface-bright transition-all cursor-pointer">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{t('contact.phone')}</h3>
                  <p className="text-on-surface-variant text-sm mb-3">{t('contact.phoneResponse')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Office Locations Map */}
      <section className="py-24 px-8 bg-surface-container-low mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4">{t('contact.globalPresence')}</h2>
              <p className="text-on-surface-variant">{t('contact.globalSubtitle')}</p>
            </div>
            <div className="flex gap-12 font-mono text-xs uppercase tracking-widest text-on-surface-variant">
              <div>
                <span className="text-primary block mb-1">London</span>
                <span>HQ & Desk</span>
              </div>
              <div>
                <span className="text-primary block mb-1">New York</span>
                <span>Americas Desk</span>
              </div>
              <div>
                <span className="text-primary block mb-1">Singapore</span>
                <span>APAC Desk</span>
              </div>
            </div>
          </div>
          
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-surface-container-lowest grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700 cursor-crosshair">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" 
              alt="World Map" 
              className="w-full h-full object-cover opacity-40"
            />
            {/* Location Pointers */}
            <div className="absolute top-1/3 left-[22%] group">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(78,222,163,0.8)]"></div>
              <div className="absolute top-full mt-2 -left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-bright px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">New York</div>
            </div>
            <div className="absolute top-[28%] left-[48%] group">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(78,222,163,0.8)]"></div>
              <div className="absolute top-full mt-2 -left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-bright px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">London</div>
            </div>
            <div className="absolute top-1/2 left-[82%] group">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(78,222,163,0.8)]"></div>
              <div className="absolute top-full mt-2 -left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-bright px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Singapore</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

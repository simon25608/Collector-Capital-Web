import { useState } from "react"
import { Search, ChevronDown, ChevronUp, CheckCircle2, Mail, MessageSquare, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from 'react-i18next';

interface SupportViewProps {
  onNavigate: (view: string) => void;
}

export function SupportView({ onNavigate }: SupportViewProps) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqs = [
    {
      q: "How do I start investing?",
      a: "Starting your investment journey with Equilibrium Pro is designed to be seamless. First, complete your account registration and identity verification (KYC). Once verified, you can deposit funds via bank transfer or supported digital assets.",
      bullets: [
        "Choose a portfolio strategy that matches your risk profile.",
        "Set up automated recurring investments to benefit from dollar-cost averaging.",
        "Monitor performance in real-time via your personalized dashboard."
      ]
    },
    { q: "Is my capital guaranteed?", a: "All investments carry risk. We employ strict risk management protocols." },
    { q: "What is the minimum deposit?", a: "The minimum deposit is $500 for standard accounts." },
    { q: "How are profits distributed?", a: "Profits are distributed monthly directly to your wallet." },
    { q: "Is Collector Capital regulated?", a: "Yes, we are fully regulated by the global financial authorities." },
  ]

  return (
    <main className="bg-surface px-6 md:px-12 py-12 max-w-6xl mx-auto pt-24">
      {/* FAQ Header */}
      <section className="mb-16">
        <div className="flex flex-col gap-6">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">{t('support.center')}</span>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface">{t('support.title')}</h1>
          <div className="relative max-w-2xl mt-4">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
            <input 
              type="text" 
              placeholder={t('support.searchPlaceholder')} 
              className="w-full bg-surface-container-high border-none rounded-2xl py-5 pl-14 pr-6 text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-secondary/20 transition-all shadow-xl shadow-black/20 outline-none"
            />
          </div>
        </div>
      </section>

      {/* FAQ Accordion Area */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-semibold text-on-surface">{t('support.gettingStarted')}</h3>
          <span className="text-sm text-on-surface-variant">{t('support.articlesCount')}</span>
        </div>

        {faqs.map((faq, idx) => (
          <div key={idx} className="group bg-surface-container-low hover:bg-surface-container-high rounded-2xl transition-all duration-300">
            <button 
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="text-lg font-medium text-on-surface group-hover:text-primary transition-colors">{faq.q}</span>
              {openFaq === idx ? (
                <ChevronUp className="text-primary w-5 h-5" />
              ) : (
                <ChevronDown className="text-on-surface-variant w-5 h-5" />
              )}
            </button>
            
            {openFaq === idx && (
              <div className="px-6 pb-8">
                <div className="h-px bg-outline-variant/10 mb-6"></div>
                <p className="text-on-surface-variant leading-relaxed mb-4">
                  {faq.a}
                </p>
                {faq.bullets && (
                  <ul className="space-y-3">
                    {faq.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-sm text-on-surface-variant">
                        <CheckCircle2 className="text-primary w-4 h-4 mt-0.5 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="mt-20 p-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl">
        <div className="bg-surface-container-lowest rounded-[1.4rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold text-on-surface mb-2">{t('support.stillHaveQuestions')}</h2>
            <p className="text-on-surface-variant">{t('support.supportTeam')}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" className="px-8 py-3" onClick={() => onNavigate('contact')}>{t('support.contactSupport')}</Button>
            <Button className="px-8 py-3">{t('support.submitTicket')}</Button>
          </div>
        </div>
      </section>

      {/* Contact Channels (from the other screen) */}
      <section className="mt-24">
        <h2 className="text-2xl font-bold mb-8">{t('support.directChannels')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-surface-container-high rounded-xl hover:bg-surface-bright transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-1">{t('support.priorityEmail')}</h3>
            <p className="text-on-surface-variant text-sm mb-3">{t('support.emailResponse')}</p>
            <span className="text-primary font-mono font-medium">support@collectorcapital.global</span>
          </div>
          <div className="p-8 bg-surface-container-high rounded-xl hover:bg-surface-bright transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-1">{t('support.liveChat')}</h3>
            <p className="text-on-surface-variant text-sm mb-3">{t('support.chatResponse')}</p>
            <span className="text-secondary font-bold text-xs uppercase tracking-widest">{t('support.startSession')} &rarr;</span>
          </div>
          <div className="p-8 bg-surface-container-high rounded-xl hover:bg-surface-bright transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-1">{t('support.phone')}</h3>
            <p className="text-on-surface-variant text-sm mb-3">{t('support.phoneResponse')}</p>
            <span className="text-tertiary font-mono font-medium">+1 (800) FOREX-CAP</span>
          </div>
        </div>
      </section>
    </main>
  )
}

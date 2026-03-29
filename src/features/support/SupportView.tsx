import { useState } from "react";
import { Search, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { ChannelCards } from "@/components/ui/channel-cards";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface SupportViewProps {
  onNavigate: (view: string) => void;
}

export function SupportView({ onNavigate }: SupportViewProps) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: t("support.faq1.q"),
      a: t("support.faq1.a"),
      bullets: [
        t("support.faq1.b1"),
        t("support.faq1.b2"),
        t("support.faq1.b3"),
      ],
    },
    { q: t("support.faq2.q"), a: t("support.faq2.a") },
    { q: t("support.faq3.q"), a: t("support.faq3.a") },
    { q: t("support.faq4.q"), a: t("support.faq4.a") },
    { q: t("support.faq5.q"), a: t("support.faq5.a") },
  ];

  return (
    <main className="bg-surface px-4 sm:px-6 md:px-12 py-12 max-w-6xl mx-auto pt-20 sm:pt-24">
      {/* FAQ Header */}
      <section className="mb-10 sm:mb-16">
        <div className="flex flex-col gap-4 sm:gap-6">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">
            {t("support.center")}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-on-surface">
            {t("support.title")}
          </h1>
          <div className="relative max-w-2xl mt-4">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
            <input
              type="text"
              placeholder={t("support.searchPlaceholder")}
              className="w-full bg-surface-container-high border-none rounded-2xl py-5 pl-14 pr-6 text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-secondary/20 transition-all shadow-xl shadow-black/20 outline-none"
            />
          </div>
        </div>
      </section>

      {/* FAQ Accordion Area */}
      <section className="space-y-4">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-semibold text-on-surface">
            {t("support.gettingStarted")}
          </h3>
          <span className="text-sm text-on-surface-variant">
            {t("support.articlesCount")}
          </span>
        </div>

        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="group bg-surface-container-low hover:bg-surface-container-high rounded-2xl transition-all duration-300"
          >
            <button
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="text-lg font-medium text-on-surface group-hover:text-primary transition-colors">
                {faq.q}
              </span>
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
                      <li
                        key={bIdx}
                        className="flex items-start gap-3 text-sm text-on-surface-variant"
                      >
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
      <section className="mt-16 sm:mt-20 p-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl">
        <div className="bg-surface-container-lowest rounded-[1.4rem] p-6 sm:p-10 flex flex-col gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-2">
              {t("support.stillHaveQuestions")}
            </h2>
            <p className="text-on-surface-variant">
              {t("support.supportTeam")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              variant="secondary"
              className="w-full sm:w-auto px-8 py-3"
              onClick={() => onNavigate("contact")}
            >
              {t("support.contactSupport")}
            </Button>
            <Button className="w-full sm:w-auto px-8 py-3">
              {t("support.submitTicket")}
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
          {t("support.directChannels")}
        </h2>
        <ChannelCards
          onNavigate={onNavigate}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
        />
      </section>
    </main>
  );
}

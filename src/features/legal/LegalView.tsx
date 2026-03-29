import {
  Calendar,
  Download,
  CheckCircle2,
  AlertTriangle,
  Gavel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export function LegalView({ setView }: { setView: (view: string) => void }) {
  const { t } = useTranslation();
  const [showPreviewWarning, setShowPreviewWarning] = useState(false);

  const handleDownloadPdf = () => {
    try {
      if (window.self !== window.top) {
        setShowPreviewWarning(true);
        setTimeout(() => setShowPreviewWarning(false), 8000);
        return;
      }
      window.print();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-32">
      <article
        id="legal-content"
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0"
      >
        {/* Hero Header */}
        <header className="mb-8 sm:mb-16 border-b border-outline-variant/10 pb-6 sm:pb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
              {t("legal.regulatoryDoc")}
            </span>
            <span className="text-on-surface-variant text-xs font-medium uppercase tracking-widest">
              v2026.03
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface mb-6 sm:mb-8">
            {t("legal.title")}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">
                {t("legal.lastUpdated")}
              </span>
            </div>
            <div id="download-btn-container" className="print:hidden relative">
              <Button
                onClick={handleDownloadPdf}
                variant="secondary"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 group"
              >
                <Download className="text-primary w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                <span className="text-sm font-bold uppercase tracking-wider">
                  {t("legal.downloadPdf")}
                </span>
              </Button>
              {showPreviewWarning && (
                <div className="absolute top-full mt-3 right-0 w-72 p-4 bg-surface-container-highest border border-outline-variant/20 rounded-xl shadow-xl text-sm text-on-surface-variant z-50 animate-in fade-in slide-in-from-top-2 text-left">
                  <p className="font-bold text-primary mb-1 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Preview Restriction
                  </p>
                  <p className="leading-relaxed">
                    PDF downloads are restricted in this preview window. Please{" "}
                    <strong>open the app in a new tab</strong> (using the icon
                    in the top right of the screen) to download, or press{" "}
                    <kbd className="bg-surface px-1.5 py-0.5 rounded text-xs border border-outline-variant/30 font-mono">
                      Ctrl+P
                    </kbd>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Legal Content */}
        <div className="space-y-10 sm:space-y-20">
          {/* Section 1 */}
          <section className="group">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-primary/30 group-hover:w-12 transition-all duration-500"></div>
              <h2 className="text-2xl font-bold tracking-tight text-primary">
                {t("legal.riskTitle")}
              </h2>
            </div>
            <div className="space-y-6 text-on-surface-variant leading-relaxed text-[1.05rem] tracking-normal font-light">
              <p>{t("legal.riskP1")}</p>
              <p className="border-l-2 border-primary/20 pl-6 italic">
                {t("legal.riskP2")}
              </p>
              <p>{t("legal.riskP3")}</p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="group">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-primary/30 group-hover:w-12 transition-all duration-500"></div>
              <h2 className="text-2xl font-bold tracking-tight text-primary">
                {t("legal.termsTitle")}
              </h2>
            </div>
            <div className="space-y-6 text-on-surface-variant leading-relaxed text-[1.05rem] font-light">
              <p>{t("legal.termsP1")}</p>
              <ul className="space-y-4 list-none">
                <li className="flex gap-4">
                  <CheckCircle2 className="text-primary/40 w-5 h-5 mt-0.5 shrink-0" />
                  <span>{t("legal.termsL1")}</span>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="text-primary/40 w-5 h-5 mt-0.5 shrink-0" />
                  <span>{t("legal.termsL2")}</span>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="text-primary/40 w-5 h-5 mt-0.5 shrink-0" />
                  <span>{t("legal.termsL3")}</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="group">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-primary/30 group-hover:w-12 transition-all duration-500"></div>
              <h2 className="text-2xl font-bold tracking-tight text-primary">
                {t("legal.regTitle")}
              </h2>
            </div>
            <div className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/5 shadow-2xl">
              <div className="space-y-6 text-on-surface-variant leading-relaxed text-[1.05rem] font-light">
                <p>{t("legal.regP1")}</p>
                <p>{t("legal.regP2")}</p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="group">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-primary/30 group-hover:w-12 transition-all duration-500"></div>
              <h2 className="text-2xl font-bold tracking-tight text-primary">
                {t("legal.limitationTitle")}
              </h2>
            </div>
            <div className="space-y-6 text-on-surface-variant leading-relaxed text-[1.05rem] font-light">
              <p>{t("legal.limitationP1")}</p>
              <div className="p-6 bg-error-container/10 rounded-xl border-l-4 border-error/40">
                <p className="text-sm font-medium text-error flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  {t("legal.criticalNotice")}
                </p>
                <p className="mt-2 text-on-error-container/80 text-sm">
                  {t("legal.criticalP1")}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Box */}
        <footer
          id="contact-footer"
          className="print:hidden mt-12 sm:mt-24 p-6 sm:p-10 bg-surface-container-high rounded-3xl text-center flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Gavel className="text-primary w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-on-surface mb-2">
            {t("legal.queriesTitle")}
          </h3>
          <p className="text-on-surface-variant mb-5 sm:mb-8 max-w-sm">
            {t("legal.queriesSubtitle")}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <Button
              onClick={() => setView("contact")}
              className="w-full sm:w-auto px-8 py-3"
            >
              {t("legal.contactCompliance")}
            </Button>
            <Button
              onClick={() => setView("support")}
              variant="secondary"
              className="w-full sm:w-auto px-8 py-3"
            >
              {t("legal.supportCenter")}
            </Button>
          </div>
        </footer>
      </article>
    </main>
  );
}

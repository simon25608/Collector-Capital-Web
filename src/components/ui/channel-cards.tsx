import { Mail, MessageSquare, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ChannelCardsProps {
  onNavigate?: (view: string) => void;
  className?: string;
}

export function ChannelCards({ onNavigate, className }: ChannelCardsProps) {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <div className="group p-5 sm:p-8 bg-surface-container-high rounded-xl hover:bg-surface-bright transition-all cursor-pointer">
        <div className="flex items-start gap-4 sm:gap-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">
              {t("contact.priorityEmail")}
            </h3>
            <p className="text-on-surface-variant text-sm mb-3">
              {t("contact.emailResponse")}
            </p>
          </div>
        </div>
      </div>

      <div className="group p-5 sm:p-8 bg-surface-container-high rounded-xl hover:bg-surface-bright transition-all cursor-pointer">
        <div className="flex items-start gap-4 sm:gap-6">
          <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">{t("contact.liveChat")}</h3>
            <p className="text-on-surface-variant text-sm mb-3">
              {t("contact.chatResponse")}
            </p>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("auth")}
                className="text-secondary font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                {t("contact.startSession")} &rarr;
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="group p-5 sm:p-8 bg-surface-container-high rounded-xl hover:bg-surface-bright transition-all cursor-pointer">
        <div className="flex items-start gap-4 sm:gap-6">
          <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">{t("contact.phone")}</h3>
            <p className="text-on-surface-variant text-sm mb-3">
              {t("contact.phoneResponse")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

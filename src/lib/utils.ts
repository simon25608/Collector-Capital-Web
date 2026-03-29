import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRiskLevel(drawdown: number) {
  const dd = Math.abs(Number(drawdown));
  const filledBars = Math.max(1, Math.min(10, dd >= 95 ? 10 : Math.ceil(dd / 10)));
  
  if (dd <= 20) {
    return {
      dashboardKey: 'dashboard.minimalRisk',
      strategiesKey: 'strategies.minimal',
      colorClass: 'text-primary',
      bgClass: 'bg-primary-container/10',
      borderClass: 'border-primary/20',
      barColorClass: 'bg-primary',
      filledBars
    };
  }
  if (dd <= 40) {
    return {
      dashboardKey: 'dashboard.lowRisk',
      strategiesKey: 'strategies.low',
      colorClass: 'text-primary',
      bgClass: 'bg-primary-container/10',
      borderClass: 'border-primary/20',
      barColorClass: 'bg-primary',
      filledBars
    };
  }
  if (dd <= 60) {
    return {
      dashboardKey: 'dashboard.moderateRisk',
      strategiesKey: 'strategies.moderate',
      colorClass: 'text-secondary',
      bgClass: 'bg-secondary-container/10',
      borderClass: 'border-secondary/20',
      barColorClass: 'bg-secondary',
      filledBars
    };
  }
  if (dd <= 80) {
    return {
      dashboardKey: 'dashboard.highRisk',
      strategiesKey: 'strategies.high',
      colorClass: 'text-tertiary',
      bgClass: 'bg-tertiary-container/10',
      borderClass: 'border-tertiary/20',
      barColorClass: 'bg-tertiary',
      filledBars
    };
  }
  return {
    dashboardKey: 'dashboard.extremeRisk',
    strategiesKey: 'strategies.extreme',
    colorClass: 'text-error',
    bgClass: 'bg-error-container/10',
    borderClass: 'border-error/20',
    barColorClass: 'bg-error',
    filledBars
  };
}

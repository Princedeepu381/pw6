// ============================================================
// src/components/shared/AlertBanner.tsx
// Assertive emergency smog notification banner (WCAG role="alert")
// Per ACCESSIBILITY.md §6 & ARCHITECTURE_PATTERNS.md §2.1
// ============================================================

import { memo } from 'react';
import type { CommunityAlert } from '@/types';

interface AlertBannerProps {
  alerts: CommunityAlert[];
  onDismiss: (id: string) => void;
}

export const AlertBanner = memo(function AlertBanner({
  alerts,
  onDismiss,
}: AlertBannerProps) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="false"
      className="fixed top-18 right-4 left-4 md:left-auto md:w-96 z-50 flex flex-col gap-2.5 pointer-events-none"
    >
      {alerts.slice(0, 2).map((alert) => (
        <div
          key={alert.id}
          className={`pointer-events-auto p-4 rounded-2xl border shadow-xl backdrop-blur-xl transition-all ${
            alert.severity === 'emergency'
              ? 'bg-slate-900/95 border-red-500/40 text-red-100 shadow-black/40 ring-1 ring-red-500/20'
              : 'bg-slate-900/95 border-amber-500/40 text-amber-100 shadow-black/40 ring-1 ring-amber-500/20'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-base" aria-hidden="true">
                {alert.severity === 'emergency' ? '🚨' : '⚠️'}
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                  {alert.zone}
                </span>
                <h4 className="font-semibold text-sm text-white mt-1 leading-snug">
                  {alert.headline}
                </h4>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onDismiss(alert.id)}
              aria-label={`Dismiss alert for ${alert.zone}`}
              className="text-slate-400 hover:text-white p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {alert.instructions}
          </p>
        </div>
      ))}
    </div>
  );
});

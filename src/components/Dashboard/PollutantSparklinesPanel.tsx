// ============================================================
// src/components/Dashboard/PollutantSparklinesPanel.tsx
// Pollutant breakdown list with 7-hour sparklines
// ============================================================

import { memo } from 'react';
import type { useAirAnalytics } from '@/hooks/useAirAnalytics';
import { Sparkline } from '@/components/shared/Sparkline';

type AnalyticsReturn = ReturnType<typeof useAirAnalytics>;

interface PollutantSparklinesPanelProps {
  zoneName: string;
  pollutantBreakdown: AnalyticsReturn['pollutantBreakdown'];
}

export const PollutantSparklinesPanel = memo(function PollutantSparklinesPanel({
  zoneName,
  pollutantBreakdown,
}: PollutantSparklinesPanelProps) {
  return (
    <div className="lg:col-span-5 bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between gap-4 backdrop-blur-xl">
      <div>
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <span aria-hidden="true">📈</span> Pollutant Trend Sparklines
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Multi-parameter gas & particle telemetry for {zoneName}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {pollutantBreakdown.map((pollutant) => (
          <div
            key={pollutant.type}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 flex items-center justify-between gap-3 hover:border-slate-700/80 transition-colors"
          >
            <div className="min-w-[85px]">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-sm text-white">{pollutant.type}</span>
                <span className="text-[10px] text-slate-500">({pollutant.unit})</span>
              </div>
              <div className="text-xs font-medium text-slate-300 mt-0.5">
                {pollutant.current}{' '}
                <span className="text-[10px] text-slate-500">/ {pollutant.threshold}</span>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <Sparkline
                values={pollutant.history}
                color={pollutant.current > pollutant.threshold ? '#ef4444' : '#10b981'}
                width={130}
                height={30}
                label={`${pollutant.type} 7-hour trend`}
              />
            </div>

            <div className="text-right min-w-[70px]">
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  pollutant.status === 'Hazardous' || pollutant.status === 'Critical'
                    ? 'bg-red-950/80 text-red-400 border border-red-500/30'
                    : pollutant.status === 'Unhealthy' || pollutant.status === 'Moderate'
                    ? 'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {pollutant.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-[11px] text-slate-400 bg-slate-900/40 rounded-xl p-3 border border-slate-800/80 flex items-start gap-2">
        <span aria-hidden="true" className="text-emerald-400">💡</span>
        <span>
          <strong>Smog Dynamics:</strong> Secondary PM2.5 formation surges when ambient humidity
          exceeds 75% alongside localized traffic NO2 emissions.
        </span>
      </div>
    </div>
  );
});

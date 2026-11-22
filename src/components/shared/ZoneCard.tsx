// ============================================================
// src/components/shared/ZoneCard.tsx
// Memoized urban zone status card with AQI badge & inversion indicators
// Per CODING_CONVENTIONS.md §4 & ACCESSIBILITY.md §7
// ============================================================

import { memo } from 'react';
import type { UrbanZone } from '@/types';
import { getAQIColor } from '@/lib/aqiCompute';

interface ZoneCardProps {
  zone: UrbanZone;
  isSelected: boolean;
  onSelect: (zoneId: string) => void;
}

export const ZoneCard = memo(function ZoneCard({
  zone,
  isSelected,
  onSelect,
}: ZoneCardProps) {
  const aqiColor = getAQIColor(zone.aqi);

  return (
    <div
      role="article"
      aria-label={`${zone.zoneName} air quality status`}
      className={`rounded-2xl border p-4 flex flex-col justify-between gap-3 transition-all ${
        isSelected
          ? 'bg-slate-900/90 border-emerald-500/80 shadow-md shadow-emerald-950/20 ring-1 ring-emerald-500/30'
          : 'bg-slate-900/50 border-slate-800 hover:border-slate-700/80'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold text-white text-sm truncate leading-snug">
            {zone.zoneName}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Primary: <span className="text-slate-300 font-medium">{zone.dominantPollutant}</span>
          </p>
        </div>
        <div
          className="px-2 py-0.5 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 shrink-0"
          style={{
            backgroundColor: `${aqiColor}15`,
            borderColor: `${aqiColor}40`,
            borderWidth: '1px',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: aqiColor }}
            aria-hidden="true"
          />
          <span className="font-mono">{zone.aqi}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 text-center text-xs py-2 px-2 bg-slate-900/80 rounded-xl border border-slate-800/80">
        <div>
          <div className="text-slate-500 text-[10px] uppercase font-mono">PM2.5</div>
          <div className="font-semibold text-slate-200 text-xs font-mono">{zone.pm25} µg</div>
        </div>
        <div>
          <div className="text-slate-500 text-[10px] uppercase font-mono">Wind</div>
          <div className="font-semibold text-slate-200 text-xs font-mono">{zone.windSpeedKmh}</div>
        </div>
        <div>
          <div className="text-slate-500 text-[10px] uppercase font-mono">Temp</div>
          <div className="font-semibold text-slate-200 text-xs font-mono">{zone.temperatureC}°</div>
        </div>
      </div>

      {zone.inversionRisk && (
        <div className="flex items-center gap-1.5 text-[11px] text-amber-300 bg-amber-950/30 px-2 py-1 rounded-lg border border-amber-500/30">
          <span aria-hidden="true">⚠️</span>
          <span className="font-medium truncate">Inversion Cap Active</span>
        </div>
      )}

      <button
        type="button"
        onClick={() => onSelect(zone.zoneId)}
        aria-pressed={isSelected}
        className={`w-full py-1.5 rounded-xl text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
          isSelected
            ? 'bg-emerald-600 text-white shadow-sm font-semibold'
            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
        }`}
      >
        {isSelected ? 'Selected Sector' : 'Inspect Sector'}
      </button>
    </div>
  );
});

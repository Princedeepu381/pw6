// ============================================================
// src/components/Dashboard/TelemetryHeroCard.tsx
// Hyperlocal primary sector telemetry hero card with simulation controls
// ============================================================

import { memo } from 'react';
import type { useAirAnalytics } from '@/hooks/useAirAnalytics';

type AnalyticsReturn = ReturnType<typeof useAirAnalytics>;

interface TelemetryHeroCardProps {
  currentZone: AnalyticsReturn['currentZone'];
  aqiCategory: AnalyticsReturn['aqiCategory'];
  aqiColor: AnalyticsReturn['aqiColor'];
  inversionStatus: AnalyticsReturn['inversionStatus'];
  simulateSmogSpike: () => void;
  simulateCleanDispersion: () => void;
}

export const TelemetryHeroCard = memo(function TelemetryHeroCard({
  currentZone,
  aqiCategory,
  aqiColor,
  inversionStatus,
  simulateSmogSpike,
  simulateCleanDispersion,
}: TelemetryHeroCardProps) {
  const aqiPercentage = Math.min(100, Math.round((currentZone.aqi / 400) * 100));

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl">
      <div
        className="absolute -right-20 -top-20 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: aqiColor }}
      />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        {/* Main Sector & AQI Gauge */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700/60">
              {currentZone.zoneName}
            </span>
            <span className="text-xs text-slate-400">
              Dominant: <strong className="text-slate-200">{currentZone.dominantPollutant}</strong>
            </span>
          </div>

          <div className="flex items-baseline gap-4 mt-3">
            <h1
              className="text-5xl sm:text-6xl font-black tracking-tight font-mono transition-colors"
              style={{ color: aqiColor }}
            >
              {currentZone.aqi}
            </h1>
            <div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm"
                style={{
                  backgroundColor: `${aqiColor}15`,
                  borderColor: `${aqiColor}50`,
                  color: aqiColor,
                }}
              >
                {aqiCategory}
              </span>
              <span className="text-xs text-slate-400 block mt-1">
                Air Quality Index (EPA Standard)
              </span>
            </div>
          </div>

          {/* EPA AQI Visual Level Bar */}
          <div className="mt-4 flex flex-col gap-1.5">
            <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${aqiPercentage}%`,
                  backgroundColor: aqiColor,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0 Good</span>
              <span>100 Moderate</span>
              <span>200 Unhealthy</span>
              <span>300+ Severe</span>
            </div>
          </div>
        </div>

        {/* Meteorological & Inversion Status Indicators */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Weather / Atmospheric Boundary */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 min-w-[190px]">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Boundary Layer</span>
              <span className="text-xs text-slate-500">Telemetry</span>
            </div>
            <div className="text-lg font-bold text-white mt-1">
              {currentZone.temperatureC}°C{' '}
              <span className="text-xs text-slate-400 font-normal">
                / {currentZone.humidityPercent}% RH
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Wind Speed: <strong className="text-slate-200">{currentZone.windSpeedKmh} km/h</strong>
            </div>
          </div>

          {/* Inversion Risk Card */}
          <div
            className={`rounded-2xl p-4 min-w-[210px] border transition-all ${
              inversionStatus.isInversion
                ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Inversion Risk
              </span>
              <span
                className={`w-2 h-2 rounded-full ${
                  inversionStatus.isInversion ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
                }`}
                aria-hidden="true"
              />
            </div>
            <div className="text-sm font-bold mt-1 capitalize text-white">
              {inversionStatus.severity} Risk
            </div>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug line-clamp-2">
              {inversionStatus.rationale}
            </p>
          </div>
        </div>
      </div>

      {/* Telemetry Simulation Engine */}
      <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-medium">Simulation Controls:</span>
          <button
            type="button"
            onClick={simulateSmogSpike}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-red-950/40 border border-red-500/40 text-red-200 hover:bg-red-900/60 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center gap-1.5"
          >
            <span aria-hidden="true">⚡</span>
            <span>Simulate Winter Smog Spike (+45 AQI)</span>
          </button>
          <button
            type="button"
            onClick={simulateCleanDispersion}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 hover:bg-emerald-900/60 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center gap-1.5"
          >
            <span aria-hidden="true">🍃</span>
            <span>Simulate Solar Wind Cleansing (-50 AQI)</span>
          </button>
        </div>
        <span className="text-[11px] text-slate-500">
          Updated: {new Date(currentZone.lastUpdated).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
});

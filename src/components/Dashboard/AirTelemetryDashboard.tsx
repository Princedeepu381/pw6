// ============================================================
// src/components/Dashboard/AirTelemetryDashboard.tsx
// Hyperlocal AQI telemetry, custom SVG heatmap, and pollutant sparklines
// Per ACCESSIBILITY.md §3 (Twin Representation) & EFFICIENCY.md §3
// ============================================================

import { memo } from 'react';
import { useAirAnalytics } from '@/hooks/useAirAnalytics';
import { Sparkline } from '@/components/shared/Sparkline';
import { ZoneCard } from '@/components/shared/ZoneCard';
import { SmogHeatmap } from './SmogHeatmap';

export const AirTelemetryDashboard = memo(function AirTelemetryDashboard() {
  const {
    zones,
    currentZone,
    selectedZoneId,
    setSelectedZoneId,
    aqiCategory,
    aqiColor,
    inversionStatus,
    pollutantBreakdown,
    simulateSmogSpike,
    simulateCleanDispersion,
  } = useAirAnalytics();

  const aqiPercentage = Math.min(100, Math.round((currentZone.aqi / 400) * 100));

  return (
    <section aria-label="Hyperlocal AQI Telemetry Dashboard" className="flex flex-col gap-6 fade-in">
      {/* Top Hero KPI Telemetry Card */}
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

      {/* Grid: SVG Heatmap (Left) & Pollutant Sparklines (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <SmogHeatmap
          zones={zones}
          selectedZoneId={selectedZoneId}
          onSelectZone={setSelectedZoneId}
        />

        {/* Pollutant Sparklines Panel */}
        <div className="lg:col-span-5 bg-slate-900/60 rounded-3xl border border-slate-800/80 p-6 flex flex-col justify-between gap-4 backdrop-blur-xl">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span aria-hidden="true">📈</span> Pollutant Trend Sparklines
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-parameter gas & particle telemetry for {currentZone.zoneName}
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
      </div>

      {/* Municipal Zone Selector Cards */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <span>Monitored Urban Sectors ({zones.length})</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {zones.map((zone) => (
            <ZoneCard
              key={zone.zoneId}
              zone={zone}
              isSelected={zone.zoneId === selectedZoneId}
              onSelect={setSelectedZoneId}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

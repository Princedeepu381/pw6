// ============================================================
// src/components/Navigation/Header.tsx
// Header shell, live status, language selector, and accessible tablist
// Per DESIGN_SYSTEM.md §4 & ACCESSIBILITY.md §2
// ============================================================

import { memo } from 'react';
import { useAppContext } from '@/context/AppContext';
import { TabId, Language, AccessibilityMode } from '@/types';
import { TRANSLATIONS } from '@/lib/constants';
import { getAQIColor } from '@/lib/aqiCompute';

export const Header = memo(function Header() {
  const {
    activeTab,
    setActiveTab,
    selectedZone,
    language,
    setLanguage,
    accessibilityMode,
    setAccessibilityMode,
  } = useAppContext();

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const aqiColor = getAQIColor(selectedZone.aqi);

  const tabs = [
    { id: TabId.Dashboard, label: t.tabDashboard || 'Air Telemetry', icon: '📡' },
    { id: TabId.Routine, label: t.tabRoutine || 'Routine Optimizer', icon: '⏰' },
    { id: TabId.Transit, label: t.tabTransit || 'Low-Emission Transit', icon: '🚇' },
    { id: TabId.IAQ, label: t.tabIAQ || 'Indoor Air & Hacks', icon: '🌿' },
    { id: TabId.Community, label: t.tabCommunity || 'Community Action', icon: '🤝' },
  ];

  return (
    <header
      aria-label="AeroGuard AI application header"
      className="sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-xl border-b border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo & Telemetry Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-tight">
                {t.appTitle || 'AeroGuard AI'}
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                LIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {t.appSubtitle || 'Urban Air Quality & Smog Public Health Assistant'}
            </p>
          </div>
        </div>

        {/* Selected Zone Quick Telemetry & Control Badges */}
        <div className="flex items-center gap-2.5">
          {/* Quick Active Zone Pill */}
          <div
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border bg-slate-900/80 text-xs shadow-sm"
            style={{ borderColor: `${aqiColor}40` }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: aqiColor }}
              aria-hidden="true"
            />
            <span className="text-slate-400">{selectedZone.zoneName}</span>
            <span className="font-bold" style={{ color: aqiColor }}>
              AQI {selectedZone.aqi}
            </span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center bg-slate-900/80 rounded-xl px-2 py-1 border border-slate-800 text-xs">
            <label htmlFor="language-select" className="sr-only">
              Select Language
            </label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-xs text-slate-300 font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value={Language.English} className="bg-slate-900 text-white">English (EN)</option>
              <option value={Language.Hindi} className="bg-slate-900 text-white">हिन्दी (HI)</option>
              <option value={Language.Arabic} className="bg-slate-900 text-white">العربية (AR)</option>
              <option value={Language.Spanish} className="bg-slate-900 text-white">Español (ES)</option>
            </select>
          </div>

          {/* Accessibility Mode Selector */}
          <div className="flex items-center bg-slate-900/80 rounded-xl px-2 py-1 border border-slate-800 text-xs">
            <label htmlFor="a11y-select" className="sr-only">
              Accessibility Mode
            </label>
            <select
              id="a11y-select"
              value={accessibilityMode}
              onChange={(e) => setAccessibilityMode(e.target.value as AccessibilityMode)}
              className="bg-transparent text-xs text-slate-300 font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value={AccessibilityMode.Standard} className="bg-slate-900 text-white">Default View</option>
              <option value={AccessibilityMode.HighContrast} className="bg-slate-900 text-white">High Contrast</option>
              <option value={AccessibilityMode.ReducedMotion} className="bg-slate-900 text-white">Reduced Motion</option>
              <option value={AccessibilityMode.ScreenReader} className="bg-slate-900 text-white">Screen Reader</option>
            </select>
          </div>
        </div>
      </div>

      {/* Modern Segmented Navigation Tabs */}
      <nav aria-label="Main application tabs" className="max-w-7xl mx-auto px-4 sm:px-6 pb-2.5">
        <div
          role="tablist"
          aria-label="Main navigation panels"
          className="flex items-center gap-1.5 p-1 bg-slate-900/70 border border-slate-800/80 rounded-2xl overflow-x-auto scrollbar-none"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                  isActive
                    ? 'text-white bg-slate-800/90 shadow-sm border border-slate-700/60 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
                }`}
              >
                <span aria-hidden="true" className="text-sm">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
});

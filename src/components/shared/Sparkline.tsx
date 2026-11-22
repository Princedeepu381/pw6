// ============================================================
// src/components/shared/Sparkline.tsx
// Pure native SVG sparkline renderer with soft area gradient
// Per EFFICIENCY.md §3 & ACCESSIBILITY.md §3
// ============================================================

import { memo, useId } from 'react';

interface SparklineProps {
  values: number[];
  color?: string;
  width?: number;
  height?: number;
  label?: string;
}

export const Sparkline = memo(function Sparkline({
  values,
  color = '#10b981',
  width = 160,
  height = 36,
  label = 'Trend sparkline',
}: SparklineProps) {
  const gradientId = useId();

  if (!values || values.length === 0) {
    return <span className="text-xs text-slate-500">No telemetry data</span>;
  }

  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const step = width / Math.max(1, values.length - 1);

  const points = values.map((v, i) => ({
    x: i * step,
    y: height - ((v - min) / range) * (height - 8) - 4,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(' ');

  const areaD = `${pathD} L${width},${height} L0,${height} Z`;

  return (
    <div className="relative inline-flex items-center">
      {/* Screen-reader only twin representation */}
      <span className="sr-only">
        {label}: values ranging from {min} to {max}, latest reading {values[values.length - 1]}
      </span>
      {/* Visual SVG marked aria-hidden */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="overflow-visible"
        aria-hidden="true"
        role="presentation"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Soft Area Fill */}
        <path d={areaD} fill={`url(#${gradientId})`} />

        {/* Crisp Line */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Latest Reading Indicator Dot */}
        {points.length > 0 && (
          <circle
            cx={points[points.length - 1].x}
            cy={points[points.length - 1].y}
            r="3"
            fill={color}
          />
        )}
      </svg>
    </div>
  );
});

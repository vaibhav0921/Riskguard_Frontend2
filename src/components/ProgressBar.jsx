import React from 'react';

export default function ProgressBar({ value, max, color = 'var(--lime)', label, valueLabel }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const isWarn   = pct >= 60 && pct < 85;
  const isDanger = pct >= 85;
  const barColor = isDanger ? 'var(--rose)' : isWarn ? 'var(--gold)' : color;

  return (
    <div>
      {(label || valueLabel) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          {label    && <span style={{ fontSize: 12, color: 'var(--muted)' }}>{label}</span>}
          {valueLabel && <span style={{ fontSize: 12, color: barColor }}>{valueLabel}</span>}
        </div>
      )}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${barColor}, ${barColor}bb)` }}
        />
      </div>
    </div>
  );
}

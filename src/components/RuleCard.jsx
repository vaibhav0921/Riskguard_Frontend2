import React from 'react';

export default function RuleCard({ icon, title, description, value, onChange, suffix, min, max, step = 1, tip, delay = 'd0' }) {
  return (
    <div className={`glass anim-fade-up ${delay}`} style={{ borderRadius: 20, padding: 20 }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 14, color: 'var(--text)', marginBottom: 4,
        }}>
          {icon} {title}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)' }}>{description}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <input
          type="number"
          className="rule-number-input"
          value={value}
          onChange={e => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
        />
        <span style={{ fontSize: 13, color: 'var(--muted)', minWidth: 55, flexShrink: 0 }}>
          {suffix}
        </span>
      </div>
      {tip && (
        <div style={{ fontSize: 11, color: 'var(--muted2)', marginTop: 10 }}>💡 {tip}</div>
      )}
    </div>
  );
}

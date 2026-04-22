import React from 'react';

export default function StatCard({ icon, label, value, sub, valueColor, delay = 'd0' }) {
  return (
    <div className={`card anim-fade-up ${delay}`} style={{ padding: 18 }}>
      <div style={{ fontSize: 20, marginBottom: 10 }}>{icon}</div>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22,
        color: valueColor || 'var(--text)', marginBottom: 4, lineHeight: 1,
      }}>
        {value}
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 2 }}>
        {label}
      </div>
      {sub && <div style={{ fontSize: 11, color: 'var(--muted2)' }}>{sub}</div>}
    </div>
  );
}

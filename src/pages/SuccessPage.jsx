import React from 'react';
import { useApp, PLANS } from '../context/AppContext';
import { useSelector } from 'react-redux';
const CheckIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
    stroke="var(--lime)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function SuccessPage({ onDashboard }) {
  const user = useSelector(s => s.auth.user);
  const subscription = useSelector(s => s.auth.subscription);
  const plan = subscription ? PLANS[subscription.planId] : null;

  const expiryFormatted = subscription
    ? new Date(subscription.expiryDate).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
    : '—';

  return (
    <div className="page-wrap" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', padding: '40px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: 380, textAlign: 'center' }}>

        {/* Checkmark */}
        <div className="anim-fade-up d0">
          <div className="anim-pulse-ring" style={{
            width: 88, height: 88, borderRadius: '50%', margin: '0 auto 24px',
            background: 'rgba(163,230,53,0.08)',
            border: '2px solid rgba(163,230,53,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CheckIcon />
          </div>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: 'var(--text)', marginBottom: 10 }}>
            Payment Successful!
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 32, lineHeight: 1.6 }}>
            Your <strong style={{ color: 'var(--text)' }}>{plan?.name}</strong> plan is now active.<br />
            Your EA will sync within 10 seconds.
          </p>
        </div>

        {/* Details Card */}
        <div className="glass anim-fade-up d1" style={{ borderRadius: 20, padding: 20, textAlign: 'left', marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>
            Activation Details
          </div>
          {[
            { label: 'Plan', value: plan?.name + ' Plan', color: 'var(--text)' },
            { label: 'Amount Paid', value: `${plan?.currency}${plan?.price}`, color: 'var(--lime)' },
            { label: 'Valid Until', value: expiryFormatted, color: 'var(--text)' },
            { label: 'Account', value: `#${user?.account}`, color: 'var(--text)' },
          ].map(row => (
            <div key={row.label} style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '8px 0',
              borderBottom: '1px solid var(--border)',
            }}>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>{row.label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: row.color }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="btn btn-lime btn-lg btn-full anim-fade-up d2" onClick={onDashboard}>
          Open Dashboard →
        </button>

      </div>
    </div>
  );
}

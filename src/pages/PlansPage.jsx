import React, { useState, useEffect } from 'react';
import { PLANS } from '../context/AppContext';
import { useApp } from '../context/AppContext';

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function PlanCard({ plan, selected, onSelect }) {
  const isAdvanced = plan.id === 'advanced';
  const selectedStyle = selected ? 'plan-card plan-selected' : (plan.featured ? 'plan-card plan-featured' : 'plan-card');

  return (
    <div className={selectedStyle} onClick={() => onSelect(plan.id)} style={{ position: 'relative' }}>

      {/* Popular badge */}
      {plan.featured && (
        <div style={{ position: 'absolute', top: 16, right: 16 }}>
          <span className="badge badge-lime">Most Popular</span>
        </div>
      )}
      {isAdvanced && (
        <div style={{ position: 'absolute', top: 16, right: 16 }}>
          <span className="badge badge-gold">Best Deal</span>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, fontSize: 22,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: selected
              ? `${plan.color.replace('var(--', 'rgba(').replace(')', ',0.15)')}`
              : 'rgba(255,255,255,0.06)',
          }}>
            {plan.icon}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 2 }}>
              {plan.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{plan.duration}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26,
            color: selected ? plan.color : 'var(--text)',
          }}>
            {plan.currency}{plan.price}
          </div>
          <div style={{ fontSize: 11, color: 'var(--muted)' }}>one-time</div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: selected ? `${plan.color}22` : 'var(--border)', marginBottom: 14 }} />

      {/* Features */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px' }}>
        {plan.features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)' }}>
            <span style={{ color: selected ? plan.color : 'var(--lime)', flexShrink: 0 }}><CheckIcon /></span>
            {f}
          </div>
        ))}
      </div>

      {/* Selected check circle */}
      {selected && (
        <div style={{
          position: 'absolute', bottom: 16, right: 16,
          width: 24, height: 24, borderRadius: '50%',
          background: plan.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#0d0f14',
        }}>
          <CheckIcon />
        </div>
      )}
    </div>
  );
}

export default function PlansPage({ onContinue }) {
  const { setSelectedPlan } = useApp();
  const [selected, setSelected] = useState(null);

  // Clear session flag — user is choosing a plan, not on dashboard.
  // This ensures refresh here goes back to login, not dashboard.
  useEffect(() => { localStorage.removeItem('rg_session'); }, []);

  const handleSelect = (planId) => {
    setSelected(planId);
    setSelectedPlan(planId);
  };

  return (
    <div className="page-wrap" style={{ padding: '40px 16px 60px' }}>
      <div className="max-w-2xl">

        {/* Header */}
        <div className="anim-fade-up d0" style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="badge badge-lime" style={{ marginBottom: 12 }}>Choose Your Plan</span>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 8, lineHeight: 1.2 }}>
            Start protecting your capital
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)' }}>
            All plans include automatic risk enforcement, live sync &amp; daily resets
          </p>
        </div>

        {/* Plan cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
          {Object.values(PLANS).map((plan, i) => (
            <div key={plan.id} className={`anim-fade-up d${i + 1}`}>
              <PlanCard
                plan={plan}
                selected={selected === plan.id}
                onSelect={handleSelect}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="anim-fade-up d4">
          <button
            className="btn btn-lime btn-lg btn-full"
            disabled={!selected}
            onClick={onContinue}
          >
            {selected
              ? `Continue with ${PLANS[selected].name} (${PLANS[selected].currency}${PLANS[selected].price}) →`
              : 'Select a plan to continue'}
          </button>
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--muted2)', marginTop: 12 }}>
            🔒 Secure payment · Cancel anytime · Instant activation
          </p>
        </div>

      </div>
    </div>
  );
}
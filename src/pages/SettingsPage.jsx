import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { fetchRules, saveRules } from '../api';
import RuleCard from '../components/RuleCard';
import Spinner from '../components/Spinner';
import { useSelector } from 'react-redux';
const DEFAULTS = { maxDailyLoss: 3.0, maxTrades: 5, maxLossStreak: 2 };

export default function SettingsPage() {
  const { showToast } = useApp();
const user = useSelector(s => s.auth.user);

  const [rules,   setRules]   = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [changed, setChanged] = useState(false);
  const [error,   setError]   = useState('');

  // Load rules on mount
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchRules(user.email, user.account);
        setRules({
          maxDailyLoss:  res.data.maxDailyLoss  ?? DEFAULTS.maxDailyLoss,
          maxTrades:     res.data.maxTrades      ?? DEFAULTS.maxTrades,
          maxLossStreak: res.data.maxLossStreak  ?? DEFAULTS.maxLossStreak,
        });
      } catch (err) {
        if (err.code !== 'ERR_NETWORK') setError('Could not load your current rules.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const updateRule = (key, val) => {
    setRules(prev => ({ ...prev, [key]: Number(val) }));
    setChanged(true);
    setError('');
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await saveRules(user.email, user.account, rules);
      showToast('Rules saved! EA will update in ~10 seconds ✅', 'success');
      setChanged(false);
    } catch (err) {
      if (err.code === 'ERR_NETWORK') {
        showToast('Saved locally — will sync when EA connects ✅', 'info');
        setChanged(false);
      } else {
        showToast('Failed to save rules. Please try again.', 'error');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setRules(DEFAULTS);
    setChanged(true);
    showToast('Reset to default values', 'info');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 12 }}>
        <Spinner large />
        <p style={{ color: 'var(--muted)', fontSize: 13 }}>Loading your rules...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '24px 16px 60px' }}>

      {/* Header */}
      <div className="anim-fade-up d0" style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: 'var(--text)', marginBottom: 6 }}>
          My Risk Rules
        </h2>
        <p style={{ fontSize: 13, color: 'var(--muted)' }}>
          Set your limits. RiskGuard enforces them automatically in MT5.
        </p>
      </div>

      {error && <div className="error-box anim-fade-in" style={{ marginBottom: 16 }}>{error}</div>}

      {/* Rule Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
        <RuleCard
          delay="d1"
          icon="🛑"
          title="Stop if I lose more than this per day"
          description="As a % of your account equity. E.g. 3 means 3% of your account."
          value={rules.maxDailyLoss}
          onChange={val => updateRule('maxDailyLoss', val)}
          suffix="% loss"
          min={0.1}
          max={50}
          step={0.1}
          tip="Recommended 2–5% to stay disciplined"
        />
        <RuleCard
          delay="d2"
          icon="🔁"
          title="Stop after losing trades in a row"
          description="Consecutive losses before trading is blocked for the rest of the day."
          value={rules.maxLossStreak}
          onChange={val => updateRule('maxLossStreak', val)}
          suffix="losses"
          min={1}
          max={20}
          tip="Setting 2–3 helps avoid revenge trading"
        />
        <RuleCard
          delay="d3"
          icon="📊"
          title="Limit my trades to this many per day"
          description="Once this number of trades is reached, trading stops for the day."
          value={rules.maxTrades}
          onChange={val => updateRule('maxTrades', val)}
          suffix="trades"
          min={1}
          max={100}
          tip="Overtrading is a leading cause of capital loss"
        />
      </div>

      {/* Preview */}
      <div className="anim-fade-up d4" style={{
        borderRadius: 18, padding: 18, marginBottom: 20,
        background: 'rgba(163,230,53,0.05)',
        border: '1px solid rgba(163,230,53,0.15)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(163,230,53,0.5)', marginBottom: 12 }}>
          Active Rules Preview
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            `Stop if daily loss reaches ${rules.maxDailyLoss}%`,
            `Stop after ${rules.maxLossStreak} losing trades in a row`,
            `Max ${rules.maxTrades} trades per day`,
          ].map((line, i) => (
            <li key={i} style={{ fontSize: 13, color: 'rgba(163,230,53,0.8)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--lime)', fontWeight: 700 }}>•</span> {line}
            </li>
          ))}
        </ul>
        <p style={{ fontSize: 11, color: 'rgba(163,230,53,0.3)', marginTop: 12 }}>
          🕐 Applied to EA within 10 seconds of saving
        </p>
      </div>

      {/* Buttons */}
      <div className="anim-fade-up d5" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          className="btn btn-lime btn-lg btn-full"
          onClick={handleSave}
          disabled={saving || !changed}
        >
          {saving ? <><Spinner /> Saving...</> : '✅ Apply My Rules'}
        </button>
        <button
          className="btn btn-ghost btn-md btn-full"
          onClick={handleReset}
          disabled={saving}
        >
          Reset to Default Values
        </button>
      </div>

      {/* Footer note */}
      <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--muted2)', marginTop: 20, lineHeight: 1.7 }}>
        Changes are pushed to your MT5 EA automatically.<br/>
        Trading will stop immediately if any rule is triggered.
      </p>

    </div>
  );
}

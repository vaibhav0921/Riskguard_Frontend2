import React from 'react';

export default function ContactPage() {
    return (
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 20px 80px' }}>

            {/* Header */}
            <div className="anim-fade-up d0" style={{ marginBottom: 40 }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: 'rgba(163,230,53,0.1)', border: '1px solid rgba(163,230,53,0.25)',
                    borderRadius: 20, padding: '5px 12px', fontSize: 11, fontWeight: 600,
                    color: '#a3e635', letterSpacing: '1.5px', textTransform: 'uppercase',
                    marginBottom: 16,
                }}>
                    📬 Contact
                </div>
                <h1 style={{
                    fontFamily: 'var(--font-display)', fontSize: 32,
                    fontWeight: 800, color: '#f1f5f9', marginBottom: 10, lineHeight: 1.2,
                }}>
                    Get in touch
                </h1>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>
                    Have questions about RiskGuard? We're here to help.<br />
                    Reach out via email or phone — we respond within 24 hours.
                </p>
            </div>

            {/* Contact Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>

                {/* Email */}
                <a
                    href="mailto:vaibhavnanavare600@gmail.com"
                    className="anim-fade-up d1"
                    style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 18, padding: '20px 22px',
                        display: 'flex', alignItems: 'center', gap: 16,
                        textDecoration: 'none', transition: 'all 0.25s ease',
                        cursor: 'pointer',
                    }}
                    onMouseOver={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                        e.currentTarget.style.borderColor = 'rgba(163,230,53,0.3)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <div style={{
                        width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                        background: 'rgba(163,230,53,0.12)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 20,
                    }}>
                        ✉️
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: 11, fontWeight: 600, letterSpacing: '1.2px',
                            textTransform: 'uppercase', color: '#64748b', marginBottom: 3,
                        }}>
                            Email us
                        </div>
                        <div style={{
                            fontFamily: 'var(--font-display)', fontSize: 15,
                            fontWeight: 600, color: '#f1f5f9',
                        }}>
                            vaibhavnanavare600@gmail.com
                        </div>
                        <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>
                            Typically replies within 24 hours
                        </div>
                    </div>
                    <div style={{ color: '#334155', fontSize: 18 }}>→</div>
                </a>

                {/* Phone */}
                <a
                    href="tel:+919022653325"
                    className="anim-fade-up d2"
                    style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 18, padding: '20px 22px',
                        display: 'flex', alignItems: 'center', gap: 16,
                        textDecoration: 'none', transition: 'all 0.25s ease',
                        cursor: 'pointer',
                    }}
                    onMouseOver={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                        e.currentTarget.style.borderColor = 'rgba(56,189,248,0.3)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <div style={{
                        width: 46, height: 46, borderRadius: 13, flexShrink: 0,
                        background: 'rgba(56,189,248,0.12)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 20,
                    }}>
                        📞
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: 11, fontWeight: 600, letterSpacing: '1.2px',
                            textTransform: 'uppercase', color: '#64748b', marginBottom: 3,
                        }}>
                            Call us
                        </div>
                        <div style={{
                            fontFamily: 'var(--font-display)', fontSize: 15,
                            fontWeight: 600, color: '#f1f5f9',
                        }}>
                            +91 90226 53325
                        </div>
                        <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>
                            Mon – Sat, 10 AM to 6 PM IST
                        </div>
                    </div>
                    <div style={{ color: '#334155', fontSize: 18 }}>→</div>
                </a>

            </div>

            {/* Divider */}
            <div className="anim-fade-up d3" style={{
                display: 'flex', alignItems: 'center', gap: 12, margin: '28px 0',
            }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
                <div style={{
                    fontSize: 11, color: '#334155', fontWeight: 500,
                    letterSpacing: '1px', textTransform: 'uppercase',
                }}>
                    Support info
                </div>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
            </div>

            {/* Info Block */}
            <div className="anim-fade-up d4" style={{
                background: 'rgba(163,230,53,0.04)',
                border: '1px solid rgba(163,230,53,0.12)',
                borderRadius: 16, padding: '20px 22px',
            }}>
                <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 13,
                    fontWeight: 700, color: '#a3e635', marginBottom: 10,
                    display: 'flex', alignItems: 'center', gap: 8,
                }}>
                    ⚡ Quick answers
                </div>
                {[
                    { key: 'Response time', val: 'Within 24 hours' },
                    { key: 'Support hours', val: 'Mon – Sat, 10 AM – 6 PM IST' },
                    { key: 'Payment issues', val: 'Priority support' },
                    { key: 'EA setup help', val: 'Included with all plans' },
                ].map((row, i) => (
                    <div key={i} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '9px 0',
                        borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        fontSize: 13,
                    }}>
                        <span style={{ color: '#64748b' }}>{row.key}</span>
                        <span style={{ color: '#cbd5e1', fontWeight: 500 }}>{row.val}</span>
                    </div>
                ))}
            </div>

            {/* Footer note */}
            <p style={{
                textAlign: 'center', fontSize: 12, color: '#334155',
                marginTop: 32, lineHeight: 1.8,
            }}>
                🔒 RiskGuard · Built for individual traders<br />
                Your data is always private and secure
            </p>

        </div>
    );
}
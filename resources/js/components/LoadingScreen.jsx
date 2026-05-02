import React, { useEffect, useState } from 'react';

export default function LoadingScreen() {
    const [phase,   setPhase]   = useState(0); // 0=masuk, 1=tahan, 2=keluar
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Fase 1 — tahan 1.2 detik
        const t1 = setTimeout(() => setPhase(1), 400);
        // Fase 2 — mulai animasi keluar
        const t2 = setTimeout(() => setPhase(2), 1600);
        // Fase 3 — hilangkan dari DOM
        const t3 = setTimeout(() => setVisible(false), 2300);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    if (!visible) return null;

    return (
        <div
            style={{
                position:   'fixed',
                inset:      0,
                zIndex:     99999,
                background: '#020617',
                display:    'flex',
                flexDirection: 'column',
                alignItems:    'center',
                justifyContent:'center',
                gap: '24px',
                opacity:    phase === 2 ? 0 : 1,
                transform:  phase === 2 ? 'scale(1.04)' : 'scale(1)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                pointerEvents: phase === 2 ? 'none' : 'all',
            }}
        >
            {/* Logo animasi */}
            <div
                style={{
                    opacity:   phase >= 0 ? 1 : 0,
                    transform: phase >= 0 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                    transition:'opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)',
                    textAlign: 'center',
                }}
            >
                {/* Ring SVG berputar */}
                <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 20px' }}>
                    <svg width="80" height="80" viewBox="0 0 80 80"
                         style={{ animation: 'loaderRingSpin 1s linear infinite', position: 'absolute', inset: 0 }}>
                        <circle cx="40" cy="40" r="34"
                                fill="none" stroke="rgba(59,110,255,0.1)" strokeWidth="3" />
                        <circle cx="40" cy="40" r="34"
                                fill="none" stroke="#3b6eff" strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray="60 154"
                                strokeDashoffset="0" />
                    </svg>
                    <svg width="80" height="80" viewBox="0 0 80 80"
                         style={{ animation: 'loaderRingSpin 1.8s linear infinite reverse', position: 'absolute', inset: 0, opacity: 0.4 }}>
                        <circle cx="40" cy="40" r="26"
                                fill="none" stroke="#f97316" strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="30 133"
                                strokeDashoffset="0" />
                    </svg>
                    {/* Titik tengah */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <div style={{
                            width: 10, height: 10, borderRadius: '50%',
                            background: '#3b6eff',
                            boxShadow: '0 0 16px #3b6eff',
                            animation: 'loaderDotPulse 1.2s ease-in-out infinite',
                        }} />
                    </div>
                </div>

                {/* Nama */}
                <div style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 700,
                    fontSize:   28,
                    color:      '#fff',
                    letterSpacing: '0.02em',
                }}>
                    MR2<span style={{ color: '#3b6eff' }}>.</span>
                </div>

                {/* Subtitle */}
                <div style={{
                    fontFamily: '"Sora", sans-serif',
                    fontSize:   13,
                    color:      'rgba(148,163,184,0.7)',
                    marginTop:  6,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    opacity:    phase >= 1 ? 1 : 0,
                    transform:  phase >= 1 ? 'translateY(0)' : 'translateY(8px)',
                    transition: 'opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s',
                }}>
                    Full-Stack Developer
                </div>
            </div>

            {/* Progress bar */}
            <div style={{
                width: 120, height: 2,
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 99,
                overflow: 'hidden',
                opacity: phase >= 1 ? 1 : 0,
                transition: 'opacity 0.3s ease',
            }}>
                <div style={{
                    height: '100%',
                    borderRadius: 99,
                    background: 'linear-gradient(90deg, #3b6eff, #f97316)',
                    width: phase === 2 ? '100%' : phase === 1 ? '70%' : '20%',
                    transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1)',
                }} />
            </div>

            <style>{`
                @keyframes loaderRingSpin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes loaderDotPulse {
                    0%,100% { transform: scale(1);    opacity: 1;   }
                    50%      { transform: scale(1.4);  opacity: 0.6; }
                }
            `}</style>
        </div>
    );
}

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PROFIL, STATS, PROJECTS, SKILLS, PENGALAMAN } from '@data/data';
import ProjectCard from '@components/ProjectCard';

// ================================================================
//  HOOK: useInView — trigger saat elemen masuk viewport
// ================================================================
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [seen, setSeen] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setSeen(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    return { ref, seen };
}

// ================================================================
//  SKILL BAR — didefinisikan SEBELUM digunakan (fix hoisting)
// ================================================================
function SkillBar({ level }) {
    const { ref, seen } = useInView();
    return (
        <div ref={ref} style={{
            height: '100%',
            borderRadius: 99,
            background: 'linear-gradient(90deg,#7dd3fc,#3b6eff,#f6c76b)',
            width: seen ? `${level}%` : '0%',
            transition: 'width 1s cubic-bezier(0.22,1,0.36,1) 0.2s',
            boxShadow: '0 0 18px rgba(125,211,252,0.35)',
        }} />
    );
}

// ================================================================
//  ANIMASI WRAPPER KOMPONEN
// ================================================================

function FadeUp({ children, delay = 0, className = '', style = {} }) {
    const { ref, seen } = useInView();
    return (
        <div ref={ref} className={className} style={{
            opacity: seen ? 1 : 0,
            transform: seen ? 'translateY(0)' : 'translateY(40px)',
            transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                         transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            ...style,
        }}>
            {children}
        </div>
    );
}

function FadeLeft({ children, delay = 0, className = '', style = {} }) {
    const { ref, seen } = useInView();
    return (
        <div ref={ref} className={className} style={{
            opacity: seen ? 1 : 0,
            transform: seen ? 'translateX(0)' : 'translateX(-50px)',
            transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                         transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            ...style,
        }}>
            {children}
        </div>
    );
}

function FadeRight({ children, delay = 0, className = '', style = {} }) {
    const { ref, seen } = useInView();
    return (
        <div ref={ref} className={className} style={{
            opacity: seen ? 1 : 0,
            transform: seen ? 'translateX(0)' : 'translateX(50px)',
            transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                         transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            ...style,
        }}>
            {children}
        </div>
    );
}

function ScaleIn({ children, delay = 0, className = '', style = {} }) {
    const { ref, seen } = useInView();
    return (
        <div ref={ref} className={className} style={{
            opacity: seen ? 1 : 0,
            transform: seen ? 'scale(1)' : 'scale(0.85)',
            filter: seen ? 'blur(0px)' : 'blur(6px)',
            transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                         transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                         filter 0.65s ease ${delay}ms`,
            ...style,
        }}>
            {children}
        </div>
    );
}

function ClipReveal({ children, delay = 0, style = {} }) {
    const { ref, seen } = useInView();
    return (
        <div ref={ref} style={{
            clipPath: seen ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
            opacity: seen ? 1 : 0,
            transition: `clip-path 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                         opacity 0.4s ease ${delay}ms`,
            ...style,
        }}>
            {children}
        </div>
    );
}

/** Stagger: setiap anak muncul berurutan — FIX: pakai div wrapper dengan inline grid */
function Stagger({ children, baseDelay = 0, stagger = 100, style = {}, gridCols = 3 }) {
    const { ref, seen } = useInView(0.1);
    return (
        <div ref={ref} style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            gap: 24,
            ...style,
        }}>
            {React.Children.map(children, (child, i) =>
                child ? (
                    <div style={{
                        opacity: seen ? 1 : 0,
                        transform: seen ? 'translateY(0)' : 'translateY(32px)',
                        transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${baseDelay + i * stagger}ms,
                                     transform 0.65s cubic-bezier(0.22,1,0.36,1) ${baseDelay + i * stagger}ms`,
                    }}>
                        {child}
                    </div>
                ) : null
            )}
        </div>
    );
}

/** Counter angka animasi — FIX: dependensi useEffect lengkap */
function CountUp({ target, suffix = '', duration = 1800, delay = 0 }) {
    const [val, setVal] = useState(0);
    const { ref, seen } = useInView();
    const num = parseInt(String(target).replace(/\D/g, ''), 10) || 0;

    useEffect(() => {
        if (!seen) return;
        let animId;
        const timer = setTimeout(() => {
            const start = performance.now();
            const tick = (now) => {
                const t = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - t, 3);
                setVal(Math.round(num * ease));
                if (t < 1) { animId = requestAnimationFrame(tick); }
            };
            animId = requestAnimationFrame(tick);
        }, delay);
        return () => { clearTimeout(timer); cancelAnimationFrame(animId); };
    }, [seen, num, duration, delay]);

    return <span ref={ref}>{val}{suffix}</span>;
}

// ================================================================
//  BACKGROUND KOMPONEN
// ================================================================

function NoiseOverlay() {
    return (
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.035, zIndex: 1 }}>
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
    );
}

function MeshBackground() {
    return (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#02030a 0%,#060b1c 42%,#0a1024 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% -20%,rgba(255,255,255,0.12),transparent 28%),radial-gradient(circle at 18% 26%,rgba(90,124,255,0.2),transparent 32%),radial-gradient(circle at 82% 74%,rgba(245,158,11,0.13),transparent 30%)' }} />
            <div style={{ position: 'absolute', top: '-22%', left: '-14%', width: '72vw', height: '72vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(56,189,248,0.15) 0%,rgba(59,110,255,0.09) 36%,transparent 70%)', filter: 'blur(8px)', animation: 'meshFloat1 12s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', bottom: '-24%', right: '-12%', width: '62vw', height: '62vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(245,158,11,0.14) 0%,rgba(249,115,22,0.08) 34%,transparent 70%)', filter: 'blur(10px)', animation: 'meshFloat2 15s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', top: '36%', left: '38%', width: '42vw', height: '42vw', borderRadius: '50%', background: 'radial-gradient(circle,rgba(129,140,248,0.12) 0%,transparent 70%)', filter: 'blur(12px)', animation: 'meshFloat3 10s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(148,163,184,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.035) 1px,transparent 1px)', backgroundSize: '72px 72px', maskImage: 'linear-gradient(to bottom,rgba(0,0,0,0.8),transparent 82%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(2,6,23,0.18),#020617 96%)' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(125,211,252,0.5),rgba(251,191,36,0.28),transparent)', animation: 'scanLine 10s linear infinite', top: 0 }} />
        </div>
    );
}

function ParticleCanvas() {
    const ref = useRef(null);
    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let W, H, animId;
        const resize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const N = W < 640 ? 20 : W < 768 ? 30 : Math.min(Math.floor((W * H) / 18000), 60);
        const pts = Array.from({ length: N }, () => ({
            x: Math.random() * W, y: Math.random() * H,
            r: Math.random() * 1.2 + 0.3,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            a: Math.random() * 0.4 + 0.1,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            const cd = W < 768 ? 80 : 120;
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < cd) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(59,110,255,${0.08 * (1 - d / cd)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(pts[i].x, pts[i].y);
                        ctx.lineTo(pts[j].x, pts[j].y);
                        ctx.stroke();
                    }
                }
            }
            pts.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(99,130,255,${p.a})`;
                ctx.fill();
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > W) p.vx *= -1;
                if (p.y < 0 || p.y > H) p.vy *= -1;
            });
            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, []);
    return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.6, zIndex: 2 }} />;
}

function Marquee() {
    const items = SKILLS.map(s => s.nama);
    return (
        <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 0', background: 'linear-gradient(90deg,rgba(15,23,42,0.8),rgba(30,41,59,0.52),rgba(15,23,42,0.8))', backdropFilter: 'blur(16px)' }}>
            <div style={{ display: 'flex', gap: 48, animation: 'marquee 22s linear infinite', whiteSpace: 'nowrap' }}>
                {[...items, ...items].map((item, i) => (
                    <span key={i} style={{ color: 'rgba(226,232,240,0.62)', fontSize: 12, fontFamily: 'monospace', letterSpacing: '0.12em', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ color: '#f6c76b', fontSize: 7 }}>◆</span>{item}
                    </span>
                ))}
            </div>
        </div>
    );
}

/** Avatar — FIX: floating badges hanya muncul di desktop, ukuran lebih proporsional */
function Avatar({ isMobile }) {
    const size = isMobile ? 180 : 238;
    const orbitOuter = isMobile ? '-32px' : '-38px';
    const orbitInner = isMobile ? '-20px' : '-26px';

    return (
        <div style={{ position: 'relative', flexShrink: 0, marginBottom: isMobile ? 48 : 0 }}>
            {/* Orbit luar */}
            <div style={{ position: 'absolute', inset: orbitOuter, borderRadius: '50%', border: '1px solid rgba(59,110,255,0.12)', animation: 'spinSlow 20s linear infinite' }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: isMobile ? 6 : 8, height: isMobile ? 6 : 8, borderRadius: '50%', background: '#3b6eff', boxShadow: '0 0 12px 3px rgba(59,110,255,0.6)' }} />
            </div>
            {/* Orbit dalam */}
            <div style={{ position: 'absolute', inset: orbitInner, borderRadius: '50%', border: '1px dashed rgba(249,115,22,0.15)', animation: 'spinSlow 14s linear infinite reverse' }}>
                <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: isMobile ? 5 : 6, height: isMobile ? 5 : 6, borderRadius: '50%', background: '#f97316', boxShadow: '0 0 10px 2px rgba(249,115,22,0.5)' }} />
            </div>

            {/* Gambar avatar */}
            <div style={{ position: 'relative', width: size, height: size, borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(59,110,255,0.35)', boxShadow: '0 0 60px rgba(59,110,255,0.2),0 0 120px rgba(59,110,255,0.08)', animation: 'avatarIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s forwards', opacity: 0 }}>
                {PROFIL.foto
                    ? <img src={PROFIL.foto} alt={PROFIL.nama} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                    : <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#1e293b,#0f172a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width={isMobile ? 60 : 80} height={isMobile ? 60 : 80} fill="none" viewBox="0 0 24 24" stroke="rgba(59,110,255,0.4)">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </div>
                }
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(59,110,255,0.08) 0%,transparent 50%,rgba(249,115,22,0.05) 100%)' }} />
            </div>

            {/* Status badge */}
            <div style={{ position: 'absolute', bottom: isMobile ? -14 : -8, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 8, padding: isMobile ? '5px 14px' : '8px 20px', borderRadius: 999, whiteSpace: 'nowrap', background: 'rgba(15,23,42,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', flexShrink: 0, animation: 'dotPulse 2s ease-in-out infinite' }} />
                <span style={{ color: '#cbd5e1', fontSize: isMobile ? 10 : 12, fontWeight: 500, letterSpacing: '0.02em' }}>Open to Work</span>
            </div>

            {/* Floating badges — hanya desktop */}
            {!isMobile && [
                { label: 'Laravel', color: '#7ca0ff', bg: 'rgba(59,110,255,0.1)', border: 'rgba(59,110,255,0.22)', top: '8%', right: '-64px', delay: '0s' },
                { label: 'React', color: '#fb923c', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.18)', top: '44%', right: '-72px', delay: '1.5s' },
                { label: 'MySQL', color: '#a5b4fc', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.18)', top: '80%', right: '-60px', delay: '3s' },
            ].map(b => (
                <div key={b.label} style={{ position: 'absolute', top: b.top, right: b.right, padding: '6px 14px', borderRadius: 8, background: b.bg, border: `1px solid ${b.border}`, backdropFilter: 'blur(8px)', color: b.color, fontSize: 11, fontWeight: 600, fontFamily: 'monospace', letterSpacing: '0.05em', animation: `floatBadge 4s ease-in-out ${b.delay} infinite`, zIndex: 4 }}>
                    {b.label}
                </div>
            ))}
        </div>
    );
}

// ================================================================
//  HALAMAN UTAMA
// ================================================================
export default function Home() {
    const featured = PROJECTS.filter(p => p.featured).slice(0, 3);
    const topSkillNames = ['Laravel', 'React', 'Tailwind CSS', 'MySQL', 'CorelDRAW', 'Figma'];
    const topSkills = topSkillNames.map(name => SKILLS.find(s => s.nama === name)).filter(Boolean);
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <>
            {/* ══ CSS GLOBAL ══ */}
            <style>{`
                *, *::before, *::after { box-sizing: border-box; }

                @keyframes meshFloat1  { 0%,100%{transform:translate(0,0)scale(1)} 50%{transform:translate(3%,5%)scale(1.05)} }
                @keyframes meshFloat2  { 0%,100%{transform:translate(0,0)scale(1)} 50%{transform:translate(-4%,-3%)scale(1.08)} }
                @keyframes meshFloat3  { 0%,100%{transform:translate(0,0)scale(1)} 50%{transform:translate(2%,-4%)scale(0.95)} }
                @keyframes scanLine    { 0%{top:0%;opacity:0}5%{opacity:1}95%{opacity:1}100%{top:100%;opacity:0} }
                @keyframes spinSlow    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
                @keyframes avatarIn    { from{opacity:0;transform:scale(0.85);filter:blur(8px)} to{opacity:1;transform:scale(1);filter:blur(0)} }
                @keyframes floatBadge  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
                @keyframes marquee     { from{transform:translateX(0)} to{transform:translateX(-50%)} }
                @keyframes heroIn      { from{opacity:0;transform:translateY(32px);filter:blur(4px)} to{opacity:1;transform:translateY(0);filter:blur(0)} }
                @keyframes shimmerText { 0%{background-position:-200% center} 100%{background-position:200% center} }
                @keyframes dotPulse    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
                @keyframes fadeUp      { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

                .h1{animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.05s forwards;opacity:0}
                .h2{animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s  forwards;opacity:0}
                .h4{animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s  forwards;opacity:0}
                .h5{animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.65s forwards;opacity:0}
                .h6{animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.8s  forwards;opacity:0}
                .h7{animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.95s forwards;opacity:0}
                .h8{animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 1.1s  forwards;opacity:0}

                .name-shimmer {
                    background: linear-gradient(90deg,#f8fafc 0%,#93c5fd 22%,#f6c76b 48%,#c7d2fe 72%,#ffffff 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmerText 5s linear infinite;
                    filter: drop-shadow(0 20px 45px rgba(59,110,255,0.22));
                }

                .btn-primary {
                    position: relative;
                    background: linear-gradient(135deg,#7dd3fc 0%,#3b6eff 42%,#1d4ed8 100%);
                    color: white;
                    padding: 14px 32px;
                    border-radius: 999px;
                    font-weight: 700;
                    font-size: 15px;
                    letter-spacing: 0.01em;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.25s ease;
                    box-shadow: 0 18px 44px rgba(59,110,255,0.28), inset 0 1px 0 rgba(255,255,255,0.35);
                    overflow: hidden;
                    border: 1px solid rgba(191,219,254,0.4);
                    cursor: pointer;
                    white-space: nowrap;
                }
                .btn-primary::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(120deg,transparent,rgba(255,255,255,0.35),transparent);
                    transform: translateX(-100%);
                    transition: transform 0.5s ease;
                }
                .btn-primary:hover::before { transform: translateX(100%); }
                .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 24px 60px rgba(59,110,255,0.38), inset 0 1px 0 rgba(255,255,255,0.45); }

                .btn-secondary {
                    background: rgba(15,23,42,0.58);
                    color: #dbeafe;
                    padding: 14px 32px;
                    border-radius: 999px;
                    font-weight: 700;
                    font-size: 15px;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    transition: all 0.25s ease;
                    border: 1px solid rgba(255,255,255,0.12);
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
                    backdrop-filter: blur(14px);
                    white-space: nowrap;
                }
                .btn-secondary:hover { color: white; border-color: rgba(125,211,252,0.42); background: rgba(59,110,255,0.12); transform: translateY(-3px); box-shadow: 0 18px 45px rgba(15,23,42,0.35), inset 0 1px 0 rgba(255,255,255,0.12); }
                .btn-sm { padding: 10px 22px !important; font-size: 13px !important; border-radius: 999px !important; }

                .stat-card {
                    padding: 20px 24px;
                    border-radius: 18px;
                    background: linear-gradient(180deg,rgba(30,41,59,0.74),rgba(15,23,42,0.46));
                    border: 1px solid rgba(255,255,255,0.1);
                    backdrop-filter: blur(18px);
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    min-width: 0;
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
                }
                .stat-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 1px;
                    background: linear-gradient(90deg,transparent,rgba(125,211,252,0.58),rgba(246,199,107,0.38),transparent);
                    opacity: 0.7;
                    transition: opacity 0.3s ease;
                }
                .stat-card:hover::before { opacity: 1; }
                .stat-card:hover { border-color: rgba(125,211,252,0.28); transform: translateY(-4px); box-shadow: 0 18px 46px rgba(0,0,0,0.36), inset 0 1px 0 rgba(255,255,255,0.12); }

                .section-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    color: #f6c76b;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    margin-bottom: 16px;
                }
                .section-eyebrow::before { content: ''; width: 32px; height: 1px; background: linear-gradient(90deg,#7dd3fc,#f6c76b); }

                .cta-box {
                    border-radius: 30px;
                    background: linear-gradient(135deg,rgba(125,211,252,0.12) 0%,rgba(15,23,42,0.78) 42%,rgba(246,199,107,0.1) 100%);
                    border: 1px solid rgba(255,255,255,0.12);
                    padding: clamp(40px,8vw,80px) clamp(24px,6vw,64px);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 40px;
                    flex-wrap: wrap;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 32px 90px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.12);
                    backdrop-filter: blur(18px);
                }

                .scroll-hint {
                    position: absolute;
                    bottom: 40px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    animation: fadeUp 1s ease 1.8s forwards;
                    opacity: 0;
                }
                .scroll-line { width: 1px; height: 48px; background: linear-gradient(180deg,#7dd3fc,#f6c76b,transparent); animation: dotPulse 2s ease-in-out infinite; }

                .p-card-inner {
                    border-radius: 24px;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.1);
                    background: linear-gradient(180deg,rgba(30,41,59,0.68),rgba(15,23,42,0.78));
                    backdrop-filter: blur(18px);
                    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
                    height: 100%;
                    box-shadow: 0 18px 55px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.08);
                }
                .project-card-wrap:hover .p-card-inner {
                    border-color: rgba(125,211,252,0.34);
                    box-shadow: 0 28px 70px rgba(0,0,0,0.46), 0 0 0 1px rgba(125,211,252,0.12);
                    transform: translateY(-6px);
                }

                .skill-hover:hover { border-color: rgba(125,211,252,0.34) !important; background: rgba(59,130,246,0.1) !important; transform: translateY(-3px); }

                .counter-num {
                    background: linear-gradient(135deg,#fff,#bfdbfe 48%,#f6c76b);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .experience-card {
                    position: relative;
                    border-radius: 22px;
                    background: linear-gradient(180deg,rgba(30,41,59,0.68),rgba(15,23,42,0.56));
                    border: 1px solid rgba(255,255,255,0.1);
                    box-shadow: 0 18px 55px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08);
                    backdrop-filter: blur(16px);
                    padding: 24px;
                    transition: all 0.3s ease;
                    overflow: hidden;
                }
                .experience-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at top right,rgba(125,211,252,0.12),transparent 34%),
                                radial-gradient(circle at bottom left,rgba(246,199,107,0.1),transparent 30%);
                    pointer-events: none;
                    opacity: 0.9;
                }
                .experience-card:hover {
                    transform: translateY(-4px);
                    border-color: rgba(125,211,252,0.32);
                    box-shadow: 0 26px 70px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.12);
                }
                .experience-dot {
                    width: 14px;
                    height: 14px;
                    border-radius: 999px;
                    background: linear-gradient(135deg,#7dd3fc,#f6c76b);
                    box-shadow: 0 0 0 6px rgba(125,211,252,0.1), 0 0 24px rgba(125,211,252,0.42);
                    flex-shrink: 0;
                    margin-top: 28px;
                    position: relative;
                    z-index: 2;
                }
                .experience-line {
                    position: absolute;
                    left: 6px;
                    top: 44px;
                    bottom: -28px;
                    width: 1px;
                    background: linear-gradient(180deg,rgba(125,211,252,0.5),rgba(246,199,107,0.2),transparent);
                }

                /* ── RESPONSIVE MOBILE ── */
                @media (max-width: 767px) {
                    .btn-primary  { padding: 11px 18px !important; font-size: 13px !important; gap: 8px !important; justify-content: center; }
                    .btn-secondary{ padding: 11px 18px !important; font-size: 13px !important; gap: 8px !important; justify-content: center; }
                    .btn-sm       { padding: 8px 16px !important; font-size: 12px !important; }
                    .stat-card    { padding: 12px 10px; text-align: center; border-radius: 14px; }
                    .experience-card { padding: 18px; border-radius: 18px; }
                    .experience-dot { width: 11px; height: 11px; margin-top: 24px; box-shadow: 0 0 0 5px rgba(125,211,252,0.1), 0 0 18px rgba(125,211,252,0.36); }
                    .experience-line { left: 5px; top: 37px; }
                    .scroll-hint  { display: none; }
                    .cta-box      { flex-direction: column; text-align: center; gap: 24px; border-radius: 22px; }
                    .section-eyebrow { font-size: 10px; margin-bottom: 12px; }
                }

                @media (max-width: 420px) {
                    .mobile-action-row { width: 100%; flex-direction: column; }
                    .mobile-action-row .btn-primary,
                    .mobile-action-row .btn-secondary { width: 100%; }
                    .mobile-section-title { font-size: 30px !important; }
                    .mobile-skill-card { padding: 12px 14px !important; }
                }
            `}</style>

            {/* ══════════════════════════════════════
                HERO SECTION
            ══════════════════════════════════════ */}
            <section style={{ minHeight: isMobile ? 'auto' : '100vh', display: 'flex', alignItems: isMobile ? 'center' : 'flex-start', position: 'relative', overflow: 'hidden', paddingTop: isMobile ? 24 : 40 }}>
                <MeshBackground />
                <ParticleCanvas />
                <NoiseOverlay />

                <div style={{ position: 'relative', zIndex: 3, maxWidth: 1180, margin: '0 auto', padding: isMobile ? '32px 16px 64px' : '32px 32px 56px', width: '100%' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isMobile ? 'center' : 'space-between',
                        gap: isMobile ? 28 : 72,
                        flexDirection: isMobile ? 'column' : 'row',
                    }}>

                        {/* ── Avatar (atas di mobile) ── */}
                        {isMobile && (
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <Avatar isMobile={true} />
                            </div>
                        )}

                        {/* ── Teks kiri ── */}
                        <div style={{ flex: 1, minWidth: 0, maxWidth: isMobile ? '100%' : 600, textAlign: isMobile ? 'center' : 'left' }}>
                            {PROFIL.tersedia && (
                                <div className="h1" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: isMobile ? '7px 16px' : '9px 22px', borderRadius: 999, marginBottom: isMobile ? 24 : 36, background: 'rgba(15,23,42,0.58)', border: '1px solid rgba(125,211,252,0.22)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)', backdropFilter: 'blur(14px)' }}>
                                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', animation: 'dotPulse 2s infinite', flexShrink: 0 }} />
                                    <span style={{ color: '#dbeafe', fontSize: isMobile ? 11 : 13, fontWeight: 600, letterSpacing: '0.02em' }}>Tersedia untuk proyek premium</span>
                                </div>
                            )}

                            <h1 style={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 800, lineHeight: 1.05, margin: '0 0 16px' }}>
                                <div className="h2" style={{ fontSize: isMobile ? 12 : 16, color: '#93c5fd', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'monospace', opacity: 0.95 }}>
                                    &lt; {PROFIL.title} /&gt;
                                </div>
                                <div className="h4" style={{ fontSize: isMobile ? 'clamp(36px,12vw,46px)' : 'clamp(52px,5.6vw,76px)', lineHeight: 0.98, display: 'block' }}>
                                    <span className="name-shimmer">{PROFIL.nama}</span>
                                </div>
                            </h1>

                            <div className="h5" style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 16, margin: isMobile ? '16px 0' : '20px 0', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                                <div style={{ height: 1, width: 44, background: 'linear-gradient(90deg,#7dd3fc,#f6c76b,transparent)' }} />
                                <span style={{ color: '#cbd5e1', fontSize: isMobile ? 10 : 13, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>CODE · AI ASSISTED · EXECUTION</span>
                            </div>

                            <p className="h6" style={{ color: '#b6c3d1', fontSize: isMobile ? 14 : 16, lineHeight: 1.75, marginBottom: isMobile ? 28 : 34, maxWidth: isMobile ? '100%' : 520 }}>
                                {PROFIL.deskripsi}
                            </p>

                            <div className="h7 mobile-action-row" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: isMobile ? 28 : 34, justifyContent: isMobile ? 'center' : 'flex-start' }}>
                                <Link to="/projects" className="btn-primary">
                                    Lihat Proyek Saya
                                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                                </Link>
                                <Link to="/contact" className="btn-secondary">Hubungi Saya</Link>
                            </div>

                            {/* Stats dengan counter animasi */}
                            <div className="h8" style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(auto-fit, minmax(110px, 1fr))',
                                gap: isMobile ? 8 : 12,
                                justifyContent: isMobile ? 'center' : 'flex-start',
                            }}>
                                {STATS.map(({ value, label, icon }, i) => (
                                    <div key={i} className="stat-card">
                                        {icon && <div style={{ color: '#f6c76b', fontSize: 9, marginBottom: 6, letterSpacing: '0.1em' }}>{icon}</div>}
                                        <div className="counter-num" style={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 800, fontSize: isMobile ? 24 : 30, lineHeight: 1 }}>
                                            <CountUp target={value} suffix={String(value).replace(/[0-9]/g, '')} delay={i * 200} />
                                        </div>
                                        <div style={{ color: '#94a3b8', fontSize: 10, marginTop: 5, whiteSpace: 'pre-line', lineHeight: 1.4 }}>{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Avatar kanan (hanya desktop) ── */}
                        {!isMobile && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, paddingRight: 28, transform: 'translateY(-18px)' }}>
                                <Avatar isMobile={false} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="scroll-hint">
                    <span style={{ color: '#94a3b8', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase' }}>scroll</span>
                    <div className="scroll-line" />
                </div>
            </section>

            {/* ══ Marquee ══ */}
            <Marquee />

            {/* ══════════════════════════════════════
                PROYEK
            ══════════════════════════════════════ */}
            <section style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '56px 16px' : '128px 32px' }}>

                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: isMobile ? 28 : 72, gap: 16, flexWrap: 'wrap' }}>
                    <FadeLeft>
                        <div>
                            <div className="section-eyebrow">Karya Terbaru</div>
                            <h2 className="mobile-section-title" style={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,52px)', color: 'white', margin: 0, lineHeight: 1.1 }}>
                                Proyek <span style={{ color: '#93c5fd' }}>Pilihan</span>
                            </h2>
                        </div>
                    </FadeLeft>
                    <FadeRight delay={100}>
                        <Link to="/projects" className="btn-secondary btn-sm">Semua Proyek →</Link>
                    </FadeRight>
                </div>

                {/* FIX: Stagger dengan gridCols prop, bukan className Tailwind */}
                <Stagger gridCols={isMobile ? 1 : 3} stagger={150} style={{ gap: isMobile ? 16 : 24 }}>
                    {featured.map(p => (
                        <div key={p.id} className="project-card-wrap">
                            <div className="p-card-inner">
                                <ProjectCard project={p} />
                            </div>
                        </div>
                    ))}
                </Stagger>

                <FadeUp delay={400} style={{ marginTop: isMobile ? 48 : 80 }}>
                    <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(59,110,255,0.4),rgba(249,115,22,0.3),transparent)' }} />
                </FadeUp>
            </section>

            {/* ══════════════════════════════════════
                PENGALAMAN
            ══════════════════════════════════════ */}
            <section style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '48px 16px' : '96px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: isMobile ? 28 : 64, gap: 16, flexWrap: 'wrap' }}>
                    <FadeLeft>
                        <div>
                            <div className="section-eyebrow">Career Path</div>
                            <h2 className="mobile-section-title" style={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,52px)', color: 'white', margin: 0, lineHeight: 1.1 }}>
                                Pengalaman <span style={{ color: '#93c5fd' }}>Profesional</span>
                            </h2>
                        </div>
                    </FadeLeft>
                    <FadeRight delay={100}>
                        <p style={{ color: '#94a3b8', fontSize: isMobile ? 13 : 14, lineHeight: 1.7, maxWidth: 360, margin: 0, textAlign: isMobile ? 'left' : 'right' }}>
                            Perjalanan membangun produk web, sistem internal, dan solusi digital dari tahap konsep sampai siap digunakan.
                        </p>
                    </FadeRight>
                </div>

                <div style={{ position: 'relative', display: 'grid', gap: isMobile ? 18 : 22 }}>
                    {PENGALAMAN.map((item, i) => (
                        <FadeUp key={`${item.tahun}-${item.jabatan}`} delay={i * 120}>
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '18px 1fr' : '160px 28px 1fr', gap: isMobile ? 10 : 22, alignItems: 'start', position: 'relative' }}>
                                {!isMobile && (
                                    <div style={{ color: '#f6c76b', fontSize: 12, fontFamily: '"Fira Code",monospace', letterSpacing: '0.06em', paddingTop: 24, textAlign: 'right' }}>
                                        {item.tahun}
                                    </div>
                                )}

                                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                                    <span className="experience-dot" />
                                    {i < PENGALAMAN.length - 1 && <span className="experience-line" />}
                                </div>

                                <article className="experience-card">
                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        {isMobile && (
                                            <div style={{ color: '#f6c76b', fontSize: 11, fontFamily: '"Fira Code",monospace', letterSpacing: '0.06em', marginBottom: 10 }}>
                                                {item.tahun}
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', alignItems: 'flex-start', marginBottom: 10 }}>
                                            <div>
                                                <h3 style={{ fontFamily: '"Space Grotesk",sans-serif', color: 'white', fontSize: isMobile ? 19 : 22, lineHeight: 1.2, margin: 0, fontWeight: 800 }}>
                                                    {item.jabatan}
                                                </h3>
                                                <p style={{ color: '#93c5fd', fontSize: 13, fontWeight: 700, margin: '6px 0 0' }}>
                                                    {item.tempat}
                                                </p>
                                            </div>
                                            <span style={{ borderRadius: 999, border: '1px solid rgba(125,211,252,0.2)', background: 'rgba(125,211,252,0.08)', color: '#dbeafe', fontSize: 11, fontWeight: 700, padding: '7px 12px', whiteSpace: 'nowrap' }}>
                                                Experience
                                            </span>
                                        </div>
                                        <p style={{ color: '#b6c3d1', fontSize: isMobile ? 13 : 14, lineHeight: 1.75, margin: 0 }}>
                                            {item.deskripsi}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        </FadeUp>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════
                SKILLS
            ══════════════════════════════════════ */}
            <section style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '48px 16px' : '96px 32px' }}>

                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: isMobile ? 28 : 72, gap: 16, flexWrap: 'wrap' }}>
                    <FadeLeft>
                        <div>
                            <div className="section-eyebrow">Tech Stack</div>
                            <h2 className="mobile-section-title" style={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,52px)', color: 'white', margin: 0, lineHeight: 1.1 }}>
                                Keahlian <span style={{ color: '#93c5fd' }}>Saya</span>
                            </h2>
                        </div>
                    </FadeLeft>
                    <FadeRight delay={100}>
                        <Link to="/skills" className="btn-secondary btn-sm">Semua Keahlian →</Link>
                    </FadeRight>
                </div>

                {/* FIX: Grid skill langsung inline, tidak bergantung Tailwind */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: isMobile ? 12 : 14,
                }}>
                    {topSkills.map((s, i) => (
                        <ScaleIn key={s.id || s.nama} delay={i * 80}>
                            <div className="skill-hover mobile-skill-card" style={{
                                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                                borderRadius: 16, background: 'linear-gradient(180deg,rgba(30,41,59,0.68),rgba(15,23,42,0.54))',
                                border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(14px)',
                                transition: 'all 0.3s ease', cursor: 'default',
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07)',
                            }}>
                                <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: 'linear-gradient(135deg,rgba(125,211,252,0.16),rgba(246,199,107,0.1))', border: '1px solid rgba(125,211,252,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dbeafe', fontFamily: 'monospace', fontSize: 11, fontWeight: 800, letterSpacing: '0.05em' }}>
                                    {s.ikon}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                        <span style={{ color: '#e2e8f0', fontWeight: 500, fontSize: 13 }}>{s.nama}</span>
                                        <span style={{ color: '#94a3b8', fontSize: 11 }}>{s.level}%</span>
                                    </div>
                                    <div style={{ height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 99, overflow: 'hidden' }}>
                                        <SkillBar level={s.level} />
                                    </div>
                                </div>
                            </div>
                        </ScaleIn>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════
                CTA
            ══════════════════════════════════════ */}
            <section style={{ padding: isMobile ? '0 16px 56px' : '0 32px 128px' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <ScaleIn>
                        <div className="cta-box">
                            <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle,rgba(125,211,252,0.18) 0%,transparent 70%)', pointerEvents: 'none' }} />
                            <div style={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(246,199,107,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />

                            <FadeLeft style={{ maxWidth: 500, position: 'relative', width: '100%' }}>
                                <div className="section-eyebrow" style={{ justifyContent: isMobile ? 'center' : 'flex-start' }}>Kolaborasi</div>
                                <h2 style={{ fontFamily: '"Space Grotesk",sans-serif', fontWeight: 800, fontSize: 'clamp(24px,4vw,42px)', color: 'white', margin: '0 0 16px', lineHeight: 1.15, textAlign: isMobile ? 'center' : 'left' }}>
                                    Punya proyek menarik?
                                </h2>
                                <p style={{ color: '#b6c3d1', fontSize: isMobile ? 14 : 16, lineHeight: 1.7, margin: 0, textAlign: isMobile ? 'center' : 'left' }}>
                                    Saya siap membantu mewujudkan ide kamu menjadi produk digital yang nyata.
                                </p>
                            </FadeLeft>

                            <FadeRight delay={150} style={{ flexShrink: 0, display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end', width: isMobile ? '100%' : 'auto' }}>
                                <Link to="/contact" className="btn-primary" style={{ fontSize: isMobile ? 14 : 16, padding: isMobile ? '12px 28px' : '16px 40px' }}>
                                    Mulai Diskusi
                                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                                </Link>
                            </FadeRight>
                        </div>
                    </ScaleIn>
                </div>
            </section>
        </>
    );
}

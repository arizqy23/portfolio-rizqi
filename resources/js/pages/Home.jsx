import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PROFIL, STATS, PROJECTS, SKILLS } from '@data/data';
import ProjectCard from '@components/ProjectCard';
import SkillBadge  from '@components/SkillBadge';

// ================================================================
//  HOOK: useInView — trigger saat elemen masuk viewport
// ================================================================
function useInView(options = {}) {
    const ref     = useRef(null);
    const [seen, setSeen] = useState(false);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setSeen(true); obs.disconnect(); }
        }, { threshold: options.threshold ?? 0.15, ...options });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return { ref, seen };
}

// ================================================================
//  ANIMASI WRAPPER KOMPONEN
// ================================================================

/** Fade naik dari bawah */
function FadeUp({ children, delay = 0, className = '', style = {} }) {
    const { ref, seen } = useInView();
    return (
        <div ref={ref} className={className} style={{
            opacity:   seen ? 1 : 0,
            transform: seen ? 'translateY(0)' : 'translateY(40px)',
            transition:`opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                        transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            ...style,
        }}>
            {children}
        </div>
    );
}

/** Fade dari kiri */
function FadeLeft({ children, delay = 0, className = '', style = {} }) {
    const { ref, seen } = useInView();
    return (
        <div ref={ref} className={className} style={{
            opacity:   seen ? 1 : 0,
            transform: seen ? 'translateX(0)' : 'translateX(-50px)',
            transition:`opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                        transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            ...style,
        }}>
            {children}
        </div>
    );
}

/** Fade dari kanan */
function FadeRight({ children, delay = 0, className = '', style = {} }) {
    const { ref, seen } = useInView();
    return (
        <div ref={ref} className={className} style={{
            opacity:   seen ? 1 : 0,
            transform: seen ? 'translateX(0)' : 'translateX(50px)',
            transition:`opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                        transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            ...style,
        }}>
            {children}
        </div>
    );
}

/** Scale masuk dari kecil */
function ScaleIn({ children, delay = 0, className = '', style = {} }) {
    const { ref, seen } = useInView();
    return (
        <div ref={ref} className={className} style={{
            opacity:   seen ? 1 : 0,
            transform: seen ? 'scale(1)' : 'scale(0.85)',
            filter:    seen ? 'blur(0px)' : 'blur(6px)',
            transition:`opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                        transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                        filter 0.65s ease ${delay}ms`,
            ...style,
        }}>
            {children}
        </div>
    );
}

/** Clip reveal dari kiri (teks) */
function ClipReveal({ children, delay = 0, style = {} }) {
    const { ref, seen } = useInView();
    return (
        <div ref={ref} style={{
            clipPath:  seen ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
            opacity:   seen ? 1 : 0,
            transition:`clip-path 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                        opacity 0.4s ease ${delay}ms`,
            ...style,
        }}>
            {children}
        </div>
    );
}

/** Stagger: setiap anak muncul berurutan */
function Stagger({ children, baseDelay = 0, stagger = 100, className = '', style = {} }) {
    const { ref, seen } = useInView({ threshold: 0.1 });
    return (
        <div ref={ref} className={className} style={style}>
            {React.Children.map(children, (child, i) =>
                child ? (
                    <div style={{
                        opacity:   seen ? 1 : 0,
                        transform: seen ? 'translateY(0)' : 'translateY(32px)',
                        transition:`opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${baseDelay + i * stagger}ms,
                                    transform 0.65s cubic-bezier(0.22,1,0.36,1) ${baseDelay + i * stagger}ms`,
                    }}>
                        {child}
                    </div>
                ) : null
            )}
        </div>
    );
}

/** Counter angka animasi */
function CountUp({ target, suffix = '', duration = 1800, delay = 0 }) {
    const [val, setVal]   = useState(0);
    const { ref, seen }   = useInView();
    const num = parseInt(target.replace(/\D/g, '')) || 0;

    useEffect(() => {
        if (!seen) return;
        const timer = setTimeout(() => {
            const start = performance.now();
            const tick  = (now) => {
                const t   = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - t, 3);
                setVal(Math.round(num * ease));
                if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }, delay);
        return () => clearTimeout(timer);
    }, [seen]);

    return <span ref={ref}>{val}{suffix}</span>;
}

// ================================================================
//  SUB-KOMPONEN BACKGROUND
// ================================================================

function NoiseOverlay() {
    return (
        <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',
                      pointerEvents:'none',opacity:0.035,zIndex:1 }}>
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
                <feColorMatrix type="saturate" values="0"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)"/>
        </svg>
    );
}

function MeshBackground() {
    return (
        <div style={{ position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none',zIndex:0 }}>
            <div style={{ position:'absolute',inset:0,background:'#020617' }}/>
            <div style={{ position:'absolute',top:'-20%',left:'-10%',width:'70vw',height:'70vw',
                          borderRadius:'50%',background:'radial-gradient(circle,rgba(59,110,255,0.12) 0%,transparent 70%)',
                          animation:'meshFloat1 12s ease-in-out infinite' }}/>
            <div style={{ position:'absolute',bottom:'-20%',right:'-10%',width:'60vw',height:'60vw',
                          borderRadius:'50%',background:'radial-gradient(circle,rgba(249,115,22,0.08) 0%,transparent 70%)',
                          animation:'meshFloat2 15s ease-in-out infinite' }}/>
            <div style={{ position:'absolute',top:'40%',left:'40%',width:'40vw',height:'40vw',
                          borderRadius:'50%',background:'radial-gradient(circle,rgba(99,102,241,0.07) 0%,transparent 70%)',
                          animation:'meshFloat3 10s ease-in-out infinite' }}/>
            <div style={{ position:'absolute',inset:0,
                          backgroundImage:'linear-gradient(rgba(59,110,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(59,110,255,0.035) 1px,transparent 1px)',
                          backgroundSize:'80px 80px' }}/>
            <div style={{ position:'absolute',left:0,right:0,height:'1px',
                          background:'linear-gradient(90deg,transparent,rgba(59,110,255,0.3),rgba(249,115,22,0.2),transparent)',
                          animation:'scanLine 10s linear infinite',top:0 }}/>
        </div>
    );
}

function ParticleCanvas() {
    const ref = useRef(null);
    useEffect(() => {
        const canvas = ref.current; if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let W = canvas.width = window.innerWidth, H = canvas.height = window.innerHeight, animId;
        const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
        window.addEventListener('resize', onResize);
        const N = window.innerWidth < 640 ? 25 : window.innerWidth < 768 ? 35 : Math.min(Math.floor((W*H)/18000),60);
        const pts = Array.from({ length: N }, () => ({
            x:Math.random()*W, y:Math.random()*H, r:Math.random()*1.2+0.3,
            vx:(Math.random()-0.5)*0.25, vy:(Math.random()-0.5)*0.25, a:Math.random()*0.4+0.1,
        }));
        const draw = () => {
            ctx.clearRect(0,0,W,H);
            const cd = W < 768 ? 80 : 120;
            for (let i=0;i<pts.length;i++) for (let j=i+1;j<pts.length;j++) {
                const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
                if (d<cd) { ctx.beginPath();ctx.strokeStyle=`rgba(59,110,255,${0.08*(1-d/cd)})`;ctx.lineWidth=0.5;ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke(); }
            }
            pts.forEach(p => {
                ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
                ctx.fillStyle=`rgba(99,130,255,${p.a})`;ctx.fill();
                p.x+=p.vx; p.y+=p.vy;
                if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1;
            });
            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
    }, []);
    return <canvas ref={ref} style={{ position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',opacity:0.6,zIndex:2 }}/>;
}

function Marquee() {
    const items = SKILLS.map(s => s.nama);
    return (
        <div style={{ overflow:'hidden',borderTop:'1px solid rgba(255,255,255,0.05)',borderBottom:'1px solid rgba(255,255,255,0.05)',
                      padding:'14px 0',background:'rgba(15,23,42,0.5)',backdropFilter:'blur(4px)' }}>
            <div style={{ display:'flex',gap:48,animation:'marquee 22s linear infinite',whiteSpace:'nowrap' }}>
                {[...items,...items].map((item,i) => (
                    <span key={i} style={{ color:'rgba(148,163,184,0.45)',fontSize:12,fontFamily:'monospace',
                                           letterSpacing:'0.1em',display:'flex',alignItems:'center',gap:12 }}>
                        <span style={{ color:'#3b6eff',fontSize:7 }}>◆</span>{item}
                    </span>
                ))}
            </div>
        </div>
    );
}

function Avatar({ isMobile }) {
    const size = isMobile ? 200 : 280;
    return (
        <div style={{ position:'relative',flexShrink:0 }}>
            <div style={{ position:'absolute',inset:isMobile?'-40px':'-48px',borderRadius:'50%',
                          border:'1px solid rgba(59,110,255,0.12)',animation:'spinSlow 20s linear infinite' }}>
                <div style={{ position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',
                              width:isMobile?6:8,height:isMobile?6:8,borderRadius:'50%',
                              background:'#3b6eff',boxShadow:'0 0 12px 3px rgba(59,110,255,0.6)' }}/>
            </div>
            <div style={{ position:'absolute',inset:isMobile?'-28px':'-32px',borderRadius:'50%',
                          border:'1px dashed rgba(249,115,22,0.15)',animation:'spinSlow 14s linear infinite reverse' }}>
                <div style={{ position:'absolute',bottom:0,left:'50%',transform:'translateX(-50%)',
                              width:isMobile?5:6,height:isMobile?5:6,borderRadius:'50%',
                              background:'#f97316',boxShadow:'0 0 10px 2px rgba(249,115,22,0.5)' }}/>
            </div>
            <div style={{ position:'relative',width:size,height:size,borderRadius:'50%',overflow:'hidden',
                          border:'2px solid rgba(59,110,255,0.35)',
                          boxShadow:'0 0 60px rgba(59,110,255,0.2),0 0 120px rgba(59,110,255,0.08)',
                          animation:'avatarIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s forwards',opacity:0 }}>
                {PROFIL.foto
                    ? <img src={PROFIL.foto} alt={PROFIL.nama} style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:'center' }}/>
                    : <div style={{ width:'100%',height:'100%',background:'linear-gradient(135deg,#1e293b,#0f172a)',
                                    display:'flex',alignItems:'center',justifyContent:'center' }}>
                        <svg width={isMobile?60:80} height={isMobile?60:80} fill="none" viewBox="0 0 24 24" stroke="rgba(59,110,255,0.4)">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                        </svg>
                      </div>
                }
                <div style={{ position:'absolute',inset:0,background:'linear-gradient(135deg,rgba(59,110,255,0.08) 0%,transparent 50%,rgba(249,115,22,0.05) 100%)' }}/>
            </div>
            <div style={{ position:'absolute',bottom:isMobile?-12:-8,left:'50%',transform:'translateX(-50%)',
                          display:'flex',alignItems:'center',gap:8,padding:isMobile?'6px 16px':'8px 20px',
                          borderRadius:999,whiteSpace:'nowrap',background:'rgba(15,23,42,0.9)',
                          backdropFilter:'blur(12px)',border:'1px solid rgba(255,255,255,0.08)',
                          boxShadow:'0 8px 32px rgba(0,0,0,0.4)' }}>
                <span style={{ width:7,height:7,borderRadius:'50%',background:'#22c55e',
                               boxShadow:'0 0 8px #22c55e',flexShrink:0,animation:'dotPulse 2s ease-in-out infinite' }}/>
                <span style={{ color:'#cbd5e1',fontSize:isMobile?11:12,fontWeight:500,letterSpacing:'0.02em' }}>Open to Work</span>
            </div>
            {!isMobile && [
                { label:'Laravel',color:'#7ca0ff',bg:'rgba(59,110,255,0.1)',  border:'rgba(59,110,255,0.22)', top:'12%',right:'230px',delay:'0s'   },
                { label:'React',  color:'#fb923c',bg:'rgba(249,115,22,0.08)', border:'rgba(249,115,22,0.18)', top:'44%',right:'270px',delay:'1.5s' },
                { label:'MySQL',  color:'#a5b4fc',bg:'rgba(99,102,241,0.08)', border:'rgba(99,102,241,0.18)', top:'76%',right:'230px',delay:'3s'   },
            ].map(b => (
                <div key={b.label} style={{ position:'absolute',top:b.top,right:b.right,padding:'6px 14px',
                                            borderRadius:8,background:b.bg,border:`1px solid ${b.border}`,
                                            backdropFilter:'blur(8px)',color:b.color,fontSize:11,fontWeight:600,
                                            fontFamily:'monospace',letterSpacing:'0.05em',
                                            animation:`floatBadge 4s ease-in-out ${b.delay} infinite` }}>
                    {b.label}
                </div>
            ))}
        </div>
    );
}

// ================================================================
//  SECTION COMPONENTS
// ================================================================

/** ── Divider bergelombang antar section ── */
function WaveDivider({ flip = false, color = '#020617' }) {
    return (
        <div style={{ lineHeight:0, transform: flip ? 'scaleY(-1)' : 'none' }}>
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display:'block',width:'100%' }}>
                <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill={color}/>
            </svg>
        </div>
    );
}

/** ── Section heading dengan garis ── */
function SectionHead({ eyebrow, title, highlight, align = 'left' }) {
    return (
        <div style={{ textAlign: align, marginBottom: 56 }}>
            <FadeUp delay={0}>
                <div style={{ display:'inline-flex',alignItems:'center',gap:10,color:'#3b6eff',
                              fontSize:11,fontWeight:700,letterSpacing:'0.2em',textTransform:'uppercase',
                              marginBottom:16 }}>
                    <span style={{ width:32,height:1,background:'#3b6eff',display:'inline-block' }}/>
                    {eyebrow}
                    {align === 'center' && <span style={{ width:32,height:1,background:'#3b6eff',display:'inline-block' }}/>}
                </div>
            </FadeUp>
            <ClipReveal delay={100}>
                <h2 style={{ fontFamily:'"Space Grotesk",sans-serif',fontWeight:800,
                             fontSize:'clamp(32px,4vw,52px)',color:'white',margin:0,lineHeight:1.1 }}>
                    {title}{' '}
                    {highlight && <span style={{ color:'#1e293b' }}>{highlight}</span>}
                </h2>
            </ClipReveal>
        </div>
    );
}

// ================================================================
//  HALAMAN UTAMA
// ================================================================
export default function Home() {
    const featured  = PROJECTS.filter(p => p.featured).slice(0, 3);
    const topSkills = SKILLS.slice(0, 6);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <>
            {/* ══ CSS GLOBAL ══ */}
            <style>{`
                @keyframes meshFloat1 { 0%,100%{transform:translate(0,0)scale(1)} 50%{transform:translate(3%,5%)scale(1.05)} }
                @keyframes meshFloat2 { 0%,100%{transform:translate(0,0)scale(1)} 50%{transform:translate(-4%,-3%)scale(1.08)} }
                @keyframes meshFloat3 { 0%,100%{transform:translate(0,0)scale(1)} 50%{transform:translate(2%,-4%)scale(0.95)} }
                @keyframes scanLine   { 0%{top:0%;opacity:0}5%{opacity:1}95%{opacity:1}100%{top:100%;opacity:0} }
                @keyframes spinSlow   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
                @keyframes avatarIn   { from{opacity:0;transform:scale(0.85);filter:blur(8px)} to{opacity:1;transform:scale(1);filter:blur(0)} }
                @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
                @keyframes marquee    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
                @keyframes heroIn     { from{opacity:0;transform:translateY(32px);filter:blur(4px)} to{opacity:1;transform:translateY(0);filter:blur(0)} }
                @keyframes shimmerText{ 0%{background-position:-200% center} 100%{background-position:200% center} }
                @keyframes dotPulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
                @keyframes fadeUp     { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
                @keyframes lineGrow   { from{width:0} to{width:100%} }
                @keyframes glowPulse  { 0%,100%{box-shadow:0 0 20px rgba(59,110,255,0.2)} 50%{box-shadow:0 0 50px rgba(59,110,255,0.45)} }
                @keyframes borderRun  {
                    0%   { background-position: 0% 0% }
                    25%  { background-position: 100% 0% }
                    50%  { background-position: 100% 100% }
                    75%  { background-position: 0% 100% }
                    100% { background-position: 0% 0% }
                }

                .h1{animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.05s forwards;opacity:0}
                .h2{animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s  forwards;opacity:0}
                .h4{animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s  forwards;opacity:0}
                .h5{animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.65s forwards;opacity:0}
                .h6{animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.8s  forwards;opacity:0}
                .h7{animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 0.95s forwards;opacity:0}
                .h8{animation:heroIn 0.8s cubic-bezier(0.22,1,0.36,1) 1.1s  forwards;opacity:0}

                .name-shimmer{
                    background:linear-gradient(90deg,#7ca0ff 0%,#f97316 25%,#7ca0ff 50%,#f97316 75%,#7ca0ff 100%);
                    background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;
                    background-clip:text;animation:shimmerText 4s linear infinite;
                }

                .btn-primary{
                    position:relative;background:linear-gradient(135deg,#3b6eff,#2554e8);color:white;
                    padding:14px 32px;border-radius:12px;font-weight:600;font-size:15px;
                    letter-spacing:0.01em;text-decoration:none;display:inline-flex;align-items:center;gap:10px;
                    transition:all 0.25s ease;box-shadow:0 4px 24px rgba(59,110,255,0.35);overflow:hidden;border:none;cursor:pointer;
                }
                .btn-primary::before{content:'';position:absolute;inset:0;background:linear-gradient(120deg,transparent,rgba(255,255,255,0.15),transparent);transform:translateX(-100%);transition:transform 0.5s ease;}
                .btn-primary:hover::before{transform:translateX(100%);}
                .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 40px rgba(59,110,255,0.5);}

                .btn-secondary{
                    background:transparent;color:#94a3b8;padding:14px 32px;border-radius:12px;
                    font-weight:500;font-size:15px;text-decoration:none;display:inline-flex;align-items:center;gap:10px;
                    transition:all 0.25s ease;border:1px solid rgba(255,255,255,0.08);
                }
                .btn-secondary:hover{color:white;border-color:rgba(59,110,255,0.4);background:rgba(59,110,255,0.06);transform:translateY(-2px);}
                .btn-sm{padding:10px 24px !important;font-size:14px !important;border-radius:10px !important;}

                .stat-card{
                    padding:20px 24px;border-radius:16px;background:rgba(15,23,42,0.6);
                    border:1px solid rgba(255,255,255,0.06);backdrop-filter:blur(8px);
                    transition:all 0.3s ease;position:relative;overflow:hidden;
                }
                .stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(59,110,255,0.4),transparent);opacity:0;transition:opacity 0.3s ease;}
                .stat-card:hover::before{opacity:1;}
                .stat-card:hover{border-color:rgba(59,110,255,0.2);transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.3);}

                .section-eyebrow{display:inline-flex;align-items:center;gap:10px;color:#3b6eff;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:20px;}
                .section-eyebrow::before{content:'';width:32px;height:1px;background:#3b6eff;}

                .cta-box{
                    border-radius:28px;
                    background:linear-gradient(135deg,rgba(59,110,255,0.08) 0%,rgba(15,23,42,0.6) 50%,rgba(249,115,22,0.05) 100%);
                    border:1px solid rgba(255,255,255,0.06);
                    padding:clamp(48px,8vw,80px) clamp(32px,6vw,64px);
                    display:flex;align-items:center;justify-content:space-between;
                    gap:48px;flex-wrap:wrap;position:relative;overflow:hidden;
                }

                .scroll-hint{position:absolute;bottom:40px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;animation:fadeUp 1s ease 1.8s forwards;opacity:0;}
                .scroll-line{width:1px;height:48px;background:linear-gradient(180deg,#3b6eff,transparent);animation:dotPulse 2s ease-in-out infinite;}

                /* Project card hover glow */
                .project-card-wrap:hover .p-card-inner{
                    border-color:rgba(59,110,255,0.3);
                    box-shadow:0 24px 60px rgba(0,0,0,0.5),0 0 0 1px rgba(59,110,255,0.15);
                    transform:translateY(-6px);
                }

                /* Skill badge shimmer on hover */
                .skill-hover:hover{border-color:rgba(59,110,255,0.3) !important;background:rgba(59,110,255,0.06) !important;}

                /* Number counter highlight */
                .counter-num{
                    background:linear-gradient(135deg,#fff,#7ca0ff);
                    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
                }

                @media(max-width:767px){
                    .btn-primary,.btn-secondary{padding:10px 20px;font-size:13px;gap:8px;}
                    .btn-sm{padding:8px 16px !important;font-size:12px !important;}
                    .stat-card{padding:12px 16px;}
                    .scroll-hint{display:none;}
                    .cta-box{flex-direction:column;text-align:center;gap:32px;}
                }
            `}</style>

            {/* ══════════════════════════════════════
                HERO SECTION
            ══════════════════════════════════════ */}
            <section style={{ minHeight:'100vh',display:'flex',alignItems:'center',position:'relative',overflow:'hidden',paddingTop:isMobile?40:80 }}>
                <MeshBackground/>
                <ParticleCanvas/>
                <NoiseOverlay/>

                <div style={{ position:'relative',zIndex:3,maxWidth:1200,margin:'0 auto',padding:isMobile?'40px 16px':'80px 24px',width:'100%' }}>
                    <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',
                                  gap:isMobile?0:64,flexWrap:'wrap',flexDirection:isMobile?'column-reverse':'row' }}>

                        {/* Kiri: Teks */}
                        <div style={{ flex:1,minWidth:isMobile?'auto':300,maxWidth:isMobile?'100%':580,textAlign:isMobile?'center':'left' }}>
                            {PROFIL.tersedia && (
                                <div className="h1" style={{ display:'inline-flex',alignItems:'center',gap:10,padding:isMobile?'6px 16px':'8px 20px',borderRadius:999,marginBottom:isMobile?28:36,background:'rgba(59,110,255,0.08)',border:'1px solid rgba(59,110,255,0.2)' }}>
                                    <span style={{ width:7,height:7,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 8px #22c55e',animation:'dotPulse 2s infinite',flexShrink:0 }}/>
                                    <span style={{ color:'#94a3b8',fontSize:isMobile?11:13,fontWeight:500,letterSpacing:'0.02em' }}>Tersedia untuk proyek baru</span>
                                </div>
                            )}

                            <h1 style={{ fontFamily:'"Space Grotesk",sans-serif',fontWeight:800,lineHeight:1.05,margin:'0 0 20px' }}>
                                <div className="h2" style={{ fontSize:'clamp(13px,2vw,16px)',color:'#3b82f6',fontWeight:600,letterSpacing:'0.25em',textTransform:'uppercase',marginBottom:12,fontFamily:'monospace',opacity:0.8 }}>
                                    &lt; {PROFIL.title} /&gt;
                                </div>
                                <div className="h4" style={{ fontSize:'clamp(42px,8vw,96px)',lineHeight:0.92,display:'block' }}>
                                    <span className="name-shimmer">arizqiboy_</span>
                                </div>
                            </h1>

                            <div className="h5" style={{ display:'flex',alignItems:'center',gap:16,margin:'24px 0',justifyContent:isMobile?'center':'flex-start' }}>
                                <div style={{ height:1,width:48,background:'linear-gradient(90deg,#3b6eff,transparent)' }}/>
                                <span style={{ color:'#334155',fontSize:13,letterSpacing:'0.15em',textTransform:'uppercase',fontWeight:500 }}>CODE · LOGIC · INTELLIGENCE</span>
                            </div>

                            <p className="h6" style={{ color:'#64748b',fontSize:isMobile?15:17,lineHeight:1.75,marginBottom:isMobile?36:44,maxWidth:isMobile?'100%':440 }}>
                                {PROFIL.deskripsi}
                            </p>

                            <div className="h7" style={{ display:'flex',gap:14,flexWrap:'wrap',marginBottom:isMobile?40:52,justifyContent:isMobile?'center':'flex-start' }}>
                                <Link to="/projects" className="btn-primary">
                                    Lihat Proyek Saya
                                    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
                                </Link>
                                <Link to="/contact" className="btn-secondary">Hubungi Saya</Link>
                            </div>

                            {/* Stats dengan counter animasi */}
                            <div className="h8" style={{ display:'flex',gap:14,flexWrap:'wrap',justifyContent:isMobile?'center':'flex-start' }}>
                                {STATS.map(({ value, label, icon }, i) => (
                                    <div key={i} className="stat-card">
                                        {icon && <div style={{ color:'#3b6eff',fontSize:9,marginBottom:6,letterSpacing:'0.1em' }}>{icon}</div>}
                                        <div className="counter-num" style={{ fontFamily:'"Space Grotesk",sans-serif',fontWeight:800,fontSize:30,lineHeight:1 }}>
                                            <CountUp target={value} suffix={value.replace(/[0-9]/g,'')} delay={i * 200} />
                                        </div>
                                        <div style={{ color:'#475569',fontSize:11,marginTop:5,whiteSpace:'pre-line',lineHeight:1.4 }}>{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Kanan: Avatar */}
                        <div style={{ display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,width:isMobile?'100%':'auto' }}>
                            <Avatar isMobile={isMobile}/>
                        </div>
                    </div>
                </div>

                <div className="scroll-hint">
                    <span style={{ color:'#1e293b',fontSize:9,letterSpacing:'0.35em',textTransform:'uppercase' }}>scroll</span>
                    <div className="scroll-line"/>
                </div>
            </section>

            {/* ══ Marquee ══ */}
            <Marquee/>

            {/* ══════════════════════════════════════
                PROYEK — animasi stagger kartu
            ══════════════════════════════════════ */}
            <section style={{ maxWidth:1200,margin:'0 auto',padding:isMobile?'80px 16px':'140px 24px' }}>

                {/* Header split kiri-kanan */}
                <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'space-between',
                              marginBottom:isMobile?48:72,gap:24,flexWrap:'wrap' }}>
                    <FadeLeft>
                        <div>
                            <div className="section-eyebrow">Karya Terbaru</div>
                            <h2 style={{ fontFamily:'"Space Grotesk",sans-serif',fontWeight:800,
                                         fontSize:'clamp(32px,4vw,52px)',color:'white',margin:0,lineHeight:1.1 }}>
                                Proyek <span style={{ color:'#1e293b' }}>Pilihan</span>
                            </h2>
                        </div>
                    </FadeLeft>
                    <FadeRight delay={100}>
                        <Link to="/projects" className="btn-secondary btn-sm">Semua Proyek →</Link>
                    </FadeRight>
                </div>

                {/* Kartu proyek stagger */}
                <Stagger className="grid md:grid-cols-3 gap-6" stagger={150}>
                    {featured.map(p => (
                        <div key={p.id} className="project-card-wrap">
                            <div className="p-card-inner" style={{ borderRadius:20,overflow:'hidden',
                                border:'1px solid rgba(255,255,255,0.06)',
                                background:'rgba(15,23,42,0.7)',backdropFilter:'blur(12px)',
                                transition:'all 0.4s cubic-bezier(0.22,1,0.36,1)' }}>
                                <ProjectCard project={p}/>
                            </div>
                        </div>
                    ))}
                </Stagger>

                {/* Garis pemisah animasi */}
                <FadeUp delay={400} style={{ marginTop: 80 }}>
                    <div style={{ height:1,background:'linear-gradient(90deg,transparent,rgba(59,110,255,0.4),rgba(249,115,22,0.3),transparent)' }}/>
                </FadeUp>
            </section>

            {/* ══════════════════════════════════════
                SKILLS — animasi grid scale masuk
            ══════════════════════════════════════ */}
            <section style={{ maxWidth:1200,margin:'0 auto',padding:isMobile?'60px 16px':'100px 24px' }}>

                <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'space-between',
                              marginBottom:isMobile?48:72,gap:24,flexWrap:'wrap' }}>
                    <FadeLeft>
                        <div>
                            <div className="section-eyebrow">Tech Stack</div>
                            <h2 style={{ fontFamily:'"Space Grotesk",sans-serif',fontWeight:800,
                                         fontSize:'clamp(32px,4vw,52px)',color:'white',margin:0,lineHeight:1.1 }}>
                                Keahlian <span style={{ color:'#1e293b' }}>Saya</span>
                            </h2>
                        </div>
                    </FadeLeft>
                    <FadeRight delay={100}>
                        <Link to="/skills" className="btn-secondary btn-sm">Semua Keahlian →</Link>
                    </FadeRight>
                </div>

                {/* Skill badge scale-in stagger */}
                <div style={{ display:'grid',gridTemplateColumns:isMobile?'1fr':'repeat(3,1fr)',gap:14 }}>
                    {topSkills.map((s, i) => (
                        <ScaleIn key={s.id} delay={i * 80}>
                            <div className="skill-hover" style={{
                                display:'flex',alignItems:'center',gap:14,padding:'14px 18px',
                                borderRadius:14,background:'rgba(15,23,42,0.6)',
                                border:'1px solid rgba(255,255,255,0.06)',backdropFilter:'blur(8px)',
                                transition:'all 0.3s ease',cursor:'default',
                            }}>
                                <div style={{ width:40,height:40,borderRadius:10,flexShrink:0,
                                              background:'rgba(59,110,255,0.1)',border:'1px solid rgba(59,110,255,0.15)',
                                              display:'flex',alignItems:'center',justifyContent:'center',
                                              color:'#7ca0ff',fontFamily:'monospace',fontSize:11,fontWeight:700,letterSpacing:'0.05em' }}>
                                    {s.ikon}
                                </div>
                                <div style={{ flex:1,minWidth:0 }}>
                                    <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6 }}>
                                        <span style={{ color:'#e2e8f0',fontWeight:500,fontSize:13 }}>{s.nama}</span>
                                        <span style={{ color:'#475569',fontSize:11 }}>{s.level}%</span>
                                    </div>
                                    <div style={{ height:3,background:'rgba(255,255,255,0.04)',borderRadius:99,overflow:'hidden' }}>
                                        <SkillBar level={s.level}/>
                                    </div>
                                </div>
                            </div>
                        </ScaleIn>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════
                CTA — animasi scale + glow
            ══════════════════════════════════════ */}
            <section style={{ padding:isMobile?'0 16px 80px':'0 24px 140px' }}>
                <div style={{ maxWidth:1200,margin:'0 auto' }}>
                    <ScaleIn>
                        <div className="cta-box">
                            <div style={{ position:'absolute',top:-60,right:-60,width:240,height:240,borderRadius:'50%',
                                          background:'radial-gradient(circle,rgba(59,110,255,0.15) 0%,transparent 70%)',pointerEvents:'none' }}/>
                            <div style={{ position:'absolute',bottom:-40,left:-40,width:160,height:160,borderRadius:'50%',
                                          background:'radial-gradient(circle,rgba(249,115,22,0.08) 0%,transparent 70%)',pointerEvents:'none' }}/>
                            <FadeLeft style={{ maxWidth:500,position:'relative' }}>
                                <div className="section-eyebrow" style={{ justifyContent:isMobile?'center':'flex-start' }}>Kolaborasi</div>
                                <h2 style={{ fontFamily:'"Space Grotesk",sans-serif',fontWeight:800,
                                             fontSize:'clamp(28px,4vw,42px)',color:'white',margin:'0 0 16px',lineHeight:1.15 }}>
                                    Punya proyek menarik?
                                </h2>
                                <p style={{ color:'#64748b',fontSize:isMobile?14:16,lineHeight:1.7,margin:0 }}>
                                    Saya siap membantu mewujudkan ide kamu menjadi produk digital yang nyata.
                                </p>
                            </FadeLeft>
                            <FadeRight delay={150} style={{ flexShrink:0 }}>
                                <Link to="/contact" className="btn-primary" style={{ fontSize:isMobile?14:16,padding:isMobile?'12px 28px':'16px 40px' }}>
                                    Mulai Diskusi
                                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/></svg>
                                </Link>
                            </FadeRight>
                        </div>
                    </ScaleIn>
                </div>
            </section>
        </>
    );
}

// ── Skill progress bar dengan animasi lebar ───────────────────
function SkillBar({ level }) {
    const { ref, seen } = useInView();
    return (
        <div ref={ref} style={{
            height:'100%',borderRadius:99,
            background:'linear-gradient(90deg,#3b6eff,#f97316)',
            width: seen ? `${level}%` : '0%',
            transition:'width 1s cubic-bezier(0.22,1,0.36,1) 0.2s',
        }}/>
    );
}

import React, { useEffect, useRef, useState } from 'react';

/* ============================================================
   AnimatedText — animasi teks masuk
   Props:
   - text      : string
   - el        : tag HTML (default: 'span')
   - className : kelas tambahan
   - delay     : delay awal dalam ms (default: 0)
   - duration  : durasi per karakter dalam ms (default: 35)
   - once      : hanya animasi sekali (default: true)
   - type      : 'chars' | 'words' | 'clip' | 'typing'
============================================================ */
export function AnimatedText({
    text      = '',
    el: Tag   = 'span',
    className = '',
    delay     = 0,
    duration  = 35,
    once      = true,
    type      = 'chars',
}) {
    const ref                       = useRef(null);
    const [visible, setVisible]     = useState(false);
    const [displayed, setDisplayed] = useState('');
    const [done, setDone]           = useState(false);

    // ── Observer: langsung visible kalau sudah di viewport ──
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const show = () => setTimeout(() => setVisible(true), delay);

        // Cek langsung sebelum pasang observer (fix hero section)
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            show();
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    show();
                    if (once) observer.disconnect();
                } else if (!once) {
                    setVisible(false);
                }
            },
            { threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [once, delay]);

    // ── Typing effect ──
    useEffect(() => {
        if (type !== 'typing' || !visible) return;
        setDisplayed('');
        setDone(false);
        let i = 0;
        const timer = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            i++;
            if (i >= text.length) { clearInterval(timer); setDone(true); }
        }, duration);
        return () => clearInterval(timer);
    }, [visible, type, text, duration]);

    // ── CLIP ──
    if (type === 'clip') {
        return (
            <Tag
                ref={ref}
                className={className}
                style={{
                    display:    'inline-block',
                    clipPath:   visible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                    opacity:    visible ? 1 : 0,
                    transition: `clip-path 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                                 opacity 0.5s ease ${delay}ms`,
                }}
            >
                {text}
            </Tag>
        );
    }

    // ── TYPING ──
    if (type === 'typing') {
        return (
            <Tag
                ref={ref}
                className={className}
                style={{
                    display:      'inline-block',
                    borderRight:  done ? 'none' : '2px solid #3b6eff',
                    paddingRight: done ? 0 : '3px',
                    animation:    done ? 'none' : 'typingBlink 0.8s step-end infinite',
                }}
            >
                {displayed}
            </Tag>
        );
    }

    // ── WORDS ──
    if (type === 'words') {
        const words = text.split(' ');
        return (
            <Tag ref={ref} className={className} style={{ display: 'inline' }}>
                {words.map((word, i) => (
                    <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em' }}>
                        <span style={{
                            display:    'inline-block',
                            transform:  visible ? 'translateY(0)' : 'translateY(110%)',
                            opacity:    visible ? 1 : 0,
                            transition: `transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay + i * 60}ms,
                                         opacity   0.45s ease                         ${delay + i * 60}ms`,
                        }}>
                            {word}
                        </span>
                    </span>
                ))}
            </Tag>
        );
    }

    // ── CHARS (default) ──
    // FIX UTAMA: pakai double-span + clip transform, TANPA opacity per-char
    // Ini mencegah konflik dengan animate-shimmer-text & text-gradient
    // yang pakai -webkit-text-fill-color / background-clip: text
    // Kalau opacity: 0 di-set pada span yang punya background-clip:text,
    // browser (khususnya Webkit) tidak akan menampilkan teks sama sekali.
    return (
        <Tag ref={ref} className={className} style={{ display: 'inline' }}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    style={{
                        display:       'inline-block',
                        overflow:      'hidden',
                        verticalAlign: 'bottom',
                        whiteSpace:    char === ' ' ? 'pre' : 'normal',
                    }}
                >
                    <span
                        style={{
                            display:         'inline-block',
                            transform:       visible
                                ? 'translateY(0) rotateX(0deg)'
                                : 'translateY(110%) rotateX(-90deg)',
                            transition:      `transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay + i * duration}ms`,
                            transformOrigin: '50% 100%',
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                </span>
            ))}
        </Tag>
    );
}

/* ============================================================
   useReveal — hook scroll-triggered reveal
============================================================ */
export function useReveal(options = {}) {
    const ref                   = useRef(null);
    const [visible, setVisible] = useState(false);
    const { threshold = 0.1, once = true, delay = 0 } = options;

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const show = () => setTimeout(() => setVisible(true), delay);

        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            show();
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    show();
                    if (once) observer.disconnect();
                } else if (!once) {
                    setVisible(false);
                }
            },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, once, delay]);

    return { ref, visible };
}

/* ============================================================
   RevealSection
============================================================ */
export function RevealSection({ children, className = '', delay = 0, direction = 'up' }) {
    const { ref, visible } = useReveal({ delay });

    const transforms = {
        up:    visible ? 'translateY(0)' : 'translateY(40px)',
        left:  visible ? 'translateX(0)' : 'translateX(-40px)',
        right: visible ? 'translateX(0)' : 'translateX(40px)',
        scale: visible ? 'scale(1)'      : 'scale(0.92)',
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity:    visible ? 1 : 0,
                transform:  transforms[direction] ?? transforms.up,
                transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                             transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

/* ============================================================
   StaggerChildren
============================================================ */
export function StaggerChildren({ children, className = '', baseDelay = 0, stagger = 100 }) {
    const { ref, visible } = useReveal();

    return (
        <div ref={ref} className={className}>
            {React.Children.map(children, (child, i) => (
                <div
                    style={{
                        opacity:    visible ? 1 : 0,
                        transform:  visible ? 'translateY(0)' : 'translateY(24px)',
                        transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${baseDelay + i * stagger}ms,
                                     transform 0.6s cubic-bezier(0.22,1,0.36,1) ${baseDelay + i * stagger}ms`,
                    }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
}

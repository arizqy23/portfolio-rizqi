import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef  = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        const dot  = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = 0, mouseY = 0;
        let ringX  = 0, ringY  = 0;
        let raf;

        const onMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // Dot langsung mengikuti
            dot.style.left = mouseX + 'px';
            dot.style.top  = mouseY + 'px';
        };

        // Ring mengikuti dengan easing (lag effect)
        const animate = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.left = ringX + 'px';
            ring.style.top  = ringY + 'px';
            raf = requestAnimationFrame(animate);
        };

        // Efek saat hover elemen interaktif
        const onEnterInteractive = () => {
            dot.style.transform  = 'translate(-50%, -50%) scale(0)';
            ring.style.width     = '50px';
            ring.style.height    = '50px';
            ring.style.borderColor = 'rgba(249,115,22,0.7)';
            ring.style.background  = 'rgba(249,115,22,0.05)';
        };
        const onLeaveInteractive = () => {
            dot.style.transform  = 'translate(-50%, -50%) scale(1)';
            ring.style.width     = '32px';
            ring.style.height    = '32px';
            ring.style.borderColor = 'rgba(59,110,255,0.5)';
            ring.style.background  = 'transparent';
        };

        document.addEventListener('mousemove', onMove);
        raf = requestAnimationFrame(animate);

        // Attach ke semua elemen interaktif
        const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, label');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', onEnterInteractive);
            el.addEventListener('mouseleave', onLeaveInteractive);
        });

        // Observer untuk elemen yang ditambah setelah mount
        const mutObs = new MutationObserver(() => {
            document.querySelectorAll('a, button, [role="button"], input, textarea, label').forEach(el => {
                el.removeEventListener('mouseenter', onEnterInteractive);
                el.removeEventListener('mouseleave', onLeaveInteractive);
                el.addEventListener('mouseenter', onEnterInteractive);
                el.addEventListener('mouseleave', onLeaveInteractive);
            });
        });
        mutObs.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf);
            mutObs.disconnect();
        };
    }, []);

    // Sembunyikan di layar sentuh
    if ('ontouchstart' in window) return null;

    return (
        <>
            {/* Titik kecil langsung */}
            <div
                ref={dotRef}
                style={{
                    position:   'fixed',
                    width:      7,
                    height:     7,
                    borderRadius: '50%',
                    background: '#3b6eff',
                    boxShadow:  '0 0 10px #3b6eff, 0 0 20px rgba(59,110,255,0.4)',
                    pointerEvents: 'none',
                    zIndex:     99998,
                    transform:  'translate(-50%, -50%)',
                    transition: 'transform 0.2s ease',
                    top: 0, left: 0,
                }}
            />
            {/* Ring lag */}
            <div
                ref={ringRef}
                style={{
                    position:   'fixed',
                    width:      32,
                    height:     32,
                    borderRadius: '50%',
                    border:     '1.5px solid rgba(59,110,255,0.5)',
                    background: 'transparent',
                    pointerEvents: 'none',
                    zIndex:     99997,
                    transform:  'translate(-50%, -50%)',
                    transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease',
                    top: 0, left: 0,
                }}
            />
        </>
    );
}

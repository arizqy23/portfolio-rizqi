import React, { useEffect, useState } from 'react';
import { PROFIL } from '@data/data';

export default function LoadingScreen() {
    const [leaving, setLeaving] = useState(false);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const leaveTimer = setTimeout(() => setLeaving(true), 650);
        const removeTimer = setTimeout(() => setVisible(false), 1050);

        return () => {
            clearTimeout(leaveTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!visible) return null;

    return (
        <div className={`loader-clean ${leaving ? 'is-leaving' : ''}`}>
            <div className="loader-clean__inner">
                <div className="loader-clean__mark">MR</div>
                <div>
                    <div className="loader-clean__name">{PROFIL.nama}</div>
                    <div className="loader-clean__role">{PROFIL.title}</div>
                </div>
            </div>

            <div className="loader-clean__bar" aria-hidden="true">
                <span />
            </div>

            <style>{`
                .loader-clean {
                    position: fixed;
                    inset: 0;
                    z-index: 99999;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 22px;
                    background: #020617;
                    color: #f8fafc;
                    opacity: 1;
                    transition: opacity 360ms ease;
                }

                .loader-clean.is-leaving {
                    opacity: 0;
                    pointer-events: none;
                }

                .loader-clean__inner {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    transform: translateY(0);
                    animation: loaderCleanIn 420ms cubic-bezier(0.22,1,0.36,1) both;
                }

                .loader-clean__mark {
                    width: 42px;
                    height: 42px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgba(255,255,255,0.12);
                    background: rgba(255,255,255,0.04);
                    font-family: "Space Grotesk", sans-serif;
                    font-size: 15px;
                    font-weight: 800;
                    letter-spacing: -0.06em;
                }

                .loader-clean__name {
                    font-family: "Space Grotesk", sans-serif;
                    font-size: 18px;
                    font-weight: 800;
                    letter-spacing: -0.03em;
                    line-height: 1.1;
                }

                .loader-clean__role {
                    margin-top: 4px;
                    color: #64748b;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }

                .loader-clean__bar {
                    width: 190px;
                    height: 2px;
                    border-radius: 999px;
                    overflow: hidden;
                    background: rgba(255,255,255,0.08);
                }

                .loader-clean__bar span {
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: inherit;
                    background: #e2e8f0;
                    transform: translateX(-100%);
                    animation: loaderCleanProgress 760ms cubic-bezier(0.22,1,0.36,1) forwards;
                }

                @keyframes loaderCleanIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes loaderCleanProgress {
                    to { transform: translateX(0); }
                }

                @media (max-width: 480px) {
                    .loader-clean__inner { gap: 12px; }
                    .loader-clean__mark { width: 40px; height: 40px; border-radius: 13px; }
                    .loader-clean__name { font-size: 17px; }
                    .loader-clean__bar { width: 170px; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .loader-clean,
                    .loader-clean__inner,
                    .loader-clean__bar span {
                        animation: none !important;
                        transition: none !important;
                    }

                    .loader-clean__bar span { transform: none; }
                }
            `}</style>
        </div>
    );
}
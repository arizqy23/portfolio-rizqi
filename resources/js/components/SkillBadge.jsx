import React, { useEffect, useRef, useState } from 'react';

export default function SkillBadge({ skill, index = 0 }) {
    const { nama, ikon, level = 80 } = skill;
    const [animated, setAnimated] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl border border-white/10
                       bg-[linear-gradient(180deg,rgba(30,41,59,0.72),rgba(15,23,42,0.78))]
                       shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]
                       hover:border-sky-300/30 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(0,0,0,0.3)]
                       transition-all duration-300 group
                       animate-fade-up opacity-0"
            style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'forwards' }}
        >
            {/* Icon circle */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[linear-gradient(135deg,rgba(125,211,252,0.16),rgba(246,199,107,0.1))] border border-sky-300/20 flex items-center justify-center
                            group-hover:border-sky-300/35 transition-colors flex-shrink-0">
                <span className="text-sky-100 font-mono text-xs font-bold uppercase">
                    {ikon ? ikon.slice(0, 2) : nama.slice(0, 2)}
                </span>
            </div>

            {/* Name + bar */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-slate-100 truncate">{nama}</span>
                    <span className="text-xs text-slate-400 ml-2 flex-shrink-0">{level}%</span>
                </div>
                <div className="h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-sky-300 via-primary-500 to-[#f6c76b] rounded-full shadow-[0_0_18px_rgba(125,211,252,0.3)]
                                   transition-all duration-700 ease-out"
                        style={{ width: animated ? `${level}%` : '0%' }}
                    />
                </div>
            </div>
        </div>
    );
}

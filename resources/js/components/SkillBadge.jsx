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
            className="flex items-center gap-4 p-4 bg-surface-900 rounded-xl border border-white/5
                       hover:border-primary-500/20 transition-all duration-300 group
                       animate-fade-up opacity-0"
            style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'forwards' }}
        >
            {/* Icon circle */}
            <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center
                            group-hover:bg-primary-500/20 transition-colors flex-shrink-0">
                <span className="text-primary-400 font-mono text-xs font-medium uppercase">
                    {ikon ? ikon.slice(0, 2) : nama.slice(0, 2)}
                </span>
            </div>

            {/* Name + bar */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-slate-200 truncate">{nama}</span>
                    <span className="text-xs text-slate-500 ml-2 flex-shrink-0">{level}%</span>
                </div>
                <div className="h-1.5 bg-surface-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary-500 to-accent-400 rounded-full
                                   transition-all duration-700 ease-out"
                        style={{ width: animated ? `${level}%` : '0%' }}
                    />
                </div>
            </div>
        </div>
    );
}

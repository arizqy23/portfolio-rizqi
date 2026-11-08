import React, { useState } from 'react';
import { SKILLS, KATEGORI_SKILLS } from '@data/data';
import SkillBadge from '@components/SkillBadge';
import { AnimatedText, RevealSection, StaggerChildren } from '@components/AnimatedText';

export default function Skills() {
    const [active, setActive] = useState('Semua');
    const tabs = ['Semua', ...KATEGORI_SKILLS];

    const displayed = active === 'Semua'
        ? SKILLS
        : SKILLS.filter(s => s.kategori === active);

    return (
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-x-hidden">
            <div className="pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-primary-500/10 blur-3xl" />
            <div className="pointer-events-none absolute top-96 right-0 h-72 w-72 rounded-full bg-[#f6c76b]/10 blur-3xl" />

            {/* Header */}
            <RevealSection className="relative mb-8 sm:mb-12">
                <div className="rounded-[22px] sm:rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(30,41,59,0.72),rgba(15,23,42,0.72))] p-5 sm:p-8 md:p-10 lg:p-12 shadow-[0_28px_80px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl overflow-hidden">
                    <div className="absolute -right-8 -top-12 h-52 w-52 rounded-full border border-white/10" />
                    <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                        <div>
                            <p className="mb-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#f6c76b]">Capabilities</p>
                            <h1 className="font-display text-[32px] sm:text-4xl md:text-6xl font-extrabold text-white leading-tight mb-3 sm:mb-4">
                                <AnimatedText text="Keahlian Saya" type="words" el="span" />
                            </h1>
                            <p className="max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
                                <AnimatedText text="Teknologi, workflow, dan tools desain yang saya gunakan untuk membangun produk digital." type="clip" delay={150} el="span" />
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-2 lg:grid-cols-5">
                            {KATEGORI_SKILLS.map(kat => (
                                <button
                                    key={kat}
                                    onClick={() => setActive(kat)}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-sky-300/30 hover:bg-white/10"
                                >
                                    <div className="text-lg font-display font-bold text-white">{SKILLS.filter(s => s.kategori === kat).length}</div>
                                    <div className="text-[11px] sm:text-xs leading-tight text-slate-400">{kat}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </RevealSection>

            {/* Tabs kategori */}
            <RevealSection className="relative -mx-4 sm:mx-0 flex flex-nowrap sm:flex-wrap gap-2 mb-8 sm:mb-10 overflow-x-auto no-scrollbar rounded-none sm:rounded-2xl border-y sm:border border-white/10 bg-white/[0.03] px-4 py-3 sm:p-3 lg:p-4 backdrop-blur" delay={100}>
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={`shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                            active === tab
                                ? 'bg-gradient-to-r from-sky-300 to-primary-500 text-white shadow-lg shadow-primary-500/25'
                                : 'bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:border-sky-300/30 hover:bg-white/10'
                        }`}
                    >
                        {tab}
                        <span className="ml-2 text-xs opacity-60">
                            {tab === 'Semua' ? SKILLS.length : SKILLS.filter(s => s.kategori === tab).length}
                        </span>
                    </button>
                ))}
            </RevealSection>

            {/* Grid skill — per filter */}
            {active !== 'Semua' && (
                <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4" stagger={70}>
                    {displayed.map(s => <SkillBadge key={s.id} skill={s} />)}
                </StaggerChildren>
            )}

            {/* Semua skill dikelompokkan per kategori */}
            {active === 'Semua' && (
                <div className="space-y-10 sm:space-y-16">
                    {KATEGORI_SKILLS.map((kat, ki) => {
                        const list = SKILLS.filter(s => s.kategori === kat);
                        return (
                            <RevealSection key={kat} delay={ki * 80}>
                                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white">{kat}</h2>
                                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 via-sky-300/20 to-transparent" />
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{list.length} skill</span>
                                </div>
                                <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4" stagger={70} baseDelay={ki * 60}>
                                    {list.map(s => <SkillBadge key={s.id} skill={s} />)}
                                </StaggerChildren>
                            </RevealSection>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

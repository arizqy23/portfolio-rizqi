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
        <section className="max-w-6xl mx-auto px-6 pt-32 pb-24">
            {/* Header */}
            <RevealSection className="mb-14">
                <h1 className="section-title">
                    <AnimatedText text="Keahlian Saya" type="words" el="span" />
                </h1>
                <p className="section-subtitle">
                    <AnimatedText text="Teknologi dan tools yang saya gunakan sehari-hari." type="clip" delay={150} el="span" />
                </p>
            </RevealSection>

            {/* Tabs kategori */}
            <RevealSection className="flex flex-wrap gap-2 mb-10" delay={100}>
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                            active === tab
                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                                : 'bg-surface-900 text-slate-400 hover:text-white border border-white/5 hover:border-primary-500/20'
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
                <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={70}>
                    {displayed.map(s => <SkillBadge key={s.id} skill={s} />)}
                </StaggerChildren>
            )}

            {/* Semua skill dikelompokkan per kategori */}
            {active === 'Semua' && (
                <div className="space-y-16">
                    {KATEGORI_SKILLS.map((kat, ki) => {
                        const list = SKILLS.filter(s => s.kategori === kat);
                        return (
                            <RevealSection key={kat} delay={ki * 80}>
                                <div className="flex items-center gap-4 mb-6">
                                    <h2 className="font-display text-xl font-semibold text-white">{kat}</h2>
                                    <div className="flex-1 h-px bg-white/5" />
                                    <span className="text-xs text-slate-600">{list.length} skill</span>
                                </div>
                                <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" stagger={70} baseDelay={ki * 60}>
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

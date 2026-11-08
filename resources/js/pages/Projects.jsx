import React, { useState } from 'react';
import { PROJECTS } from '@data/data';
import ProjectCard from '@components/ProjectCard';
import { AnimatedText, RevealSection, StaggerChildren } from '@components/AnimatedText';

export default function Projects() {
    const [filter, setFilter] = useState('Semua');

    // Kumpulkan semua teknologi unik untuk filter
    const allTech = ['Semua', ...new Set(PROJECTS.flatMap(p => p.teknologi))];

    const displayed = filter === 'Semua'
        ? PROJECTS
        : PROJECTS.filter(p => p.teknologi.includes(filter));

    return (
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-x-hidden">
            <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
            <div className="pointer-events-none absolute top-72 -left-24 h-72 w-72 rounded-full bg-[#f6c76b]/10 blur-3xl" />

            {/* Header */}
            <RevealSection className="relative mb-8 sm:mb-12">
                <div className="rounded-[22px] sm:rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(30,41,59,0.72),rgba(15,23,42,0.72))] p-5 sm:p-8 md:p-10 lg:p-12 shadow-[0_28px_80px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl overflow-hidden">
                    <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-sky-300/10 blur-2xl" />
                    <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                        <div>
                            <p className="mb-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#f6c76b]">Selected Works</p>
                            <h1 className="font-display text-[32px] sm:text-4xl md:text-6xl font-extrabold text-white leading-tight mb-3 sm:mb-4">
                                <AnimatedText text="Semua Proyek" type="words" el="span" />
                            </h1>
                            <p className="max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
                                <AnimatedText text="Kumpulan proyek dari aplikasi internal hingga produk yang sudah live." type="clip" delay={150} el="span" />
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:self-end">
                            {[
                                { value: PROJECTS.length, label: 'Total proyek' },
                                { value: PROJECTS.filter(p => p.featured).length, label: 'Proyek pilihan' },
                                { value: allTech.length - 1, label: 'Teknologi' },
                            ].map(item => (
                                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-2 sm:px-4 py-3 text-center sm:text-left">
                                    <div className="font-display text-xl sm:text-2xl font-bold text-white">{item.value}</div>
                                    <div className="text-[10px] sm:text-xs leading-tight text-slate-400">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </RevealSection>

            {/* Filter teknologi */}
            <RevealSection className="relative -mx-4 sm:mx-0 flex flex-nowrap sm:flex-wrap gap-2 mb-8 sm:mb-10 overflow-x-auto no-scrollbar rounded-none sm:rounded-2xl border-y sm:border border-white/10 bg-white/[0.03] px-4 py-3 sm:p-3 lg:p-4 backdrop-blur" delay={100}>
                {allTech.map(tech => (
                    <button
                        key={tech}
                        onClick={() => setFilter(tech)}
                        className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                            filter === tech
                                ? 'bg-gradient-to-r from-sky-300 to-primary-500 text-white shadow-lg shadow-primary-500/25'
                                : 'bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:border-sky-300/30 hover:bg-white/10'
                        }`}
                    >
                        {tech}
                    </button>
                ))}
            </RevealSection>

            {/* Grid proyek */}
            {displayed.length === 0 ? (
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] py-20 text-center text-slate-400">
                    Tidak ada proyek dengan teknologi ini.
                </div>
            ) : (
                <StaggerChildren className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-7" stagger={100}>
                    {displayed.map(p => <ProjectCard key={p.id} project={p} />)}
                </StaggerChildren>
            )}
        </section>
    );
}

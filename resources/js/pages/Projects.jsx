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
        <section className="max-w-6xl mx-auto px-6 pt-32 pb-24">
            {/* Header */}
            <RevealSection className="mb-14">
                <h1 className="section-title">
                    <AnimatedText text="Semua Proyek" type="words" el="span" />
                </h1>
                <p className="section-subtitle">
                    <AnimatedText text="Kumpulan proyek dari aplikasi internal hingga produk yang sudah live." type="clip" delay={150} el="span" />
                </p>
            </RevealSection>

            {/* Filter teknologi */}
            <RevealSection className="flex flex-wrap gap-2 mb-10" delay={100}>
                {allTech.map(tech => (
                    <button
                        key={tech}
                        onClick={() => setFilter(tech)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                            filter === tech
                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                                : 'bg-surface-900 text-slate-400 hover:text-white border border-white/5 hover:border-primary-500/20'
                        }`}
                    >
                        {tech}
                    </button>
                ))}
            </RevealSection>

            {/* Grid proyek */}
            {displayed.length === 0 ? (
                <div className="text-center py-20 text-slate-500">Tidak ada proyek dengan teknologi ini.</div>
            ) : (
                <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={100}>
                    {displayed.map(p => <ProjectCard key={p.id} project={p} />)}
                </StaggerChildren>
            )}
        </section>
    );
}

import React from 'react';

export default function ProjectCard({ project, index = 0 }) {
    const { judul, deskripsi, gambar_url, link, demo_link, teknologi = [] } = project;

    return (
        <article
            className="card group flex flex-col animate-fade-up opacity-0"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
        >
            {/* Thumbnail */}
            <div className="relative h-48 bg-surface-800 overflow-hidden">
                {gambar_url ? (
                    <img
                        src={gambar_url}
                        alt={judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-4xl font-bold text-primary-500/20">
                            {judul.charAt(0)}
                        </span>
                    </div>
                )}

                {/* Overlay links */}
                <div className="absolute inset-0 bg-surface-950/80 opacity-0 group-hover:opacity-100
                                flex items-center justify-center gap-3 transition-opacity duration-300">
                    {demo_link && (
                        <a href={demo_link} target="_blank" rel="noopener noreferrer"
                           className="btn-primary text-sm py-2 px-4">
                            Demo
                        </a>
                    )}
                    {link && (
                        <a href={link} target="_blank" rel="noopener noreferrer"
                           className="btn-outline text-sm py-2 px-4">
                            Kode
                        </a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1 gap-3">
                <h3 className="font-display font-semibold text-white text-lg leading-snug">
                    {judul}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 line-clamp-3">
                    {deskripsi}
                </p>

                {/* Tech tags */}
                {teknologi.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-white/5">
                        {teknologi.map((tech) => (
                            <span key={tech} className="tag">{tech}</span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}

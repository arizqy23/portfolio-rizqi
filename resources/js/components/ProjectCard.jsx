import React from 'react';

export default function ProjectCard({ project, index = 0 }) {
    const { judul, deskripsi, gambar_url, gambar, link, demo_link, teknologi = [] } = project;
    const image = gambar_url || gambar;

    return (
        <article
            className="card group flex flex-col animate-fade-up opacity-0 h-full"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
        >
            {/* Thumbnail */}
            <div className="relative h-40 sm:h-48 lg:h-52 bg-surface-800 overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_20%_20%,rgba(125,211,252,0.18),transparent_30%),radial-gradient(circle_at_80%_75%,rgba(246,199,107,0.16),transparent_32%),linear-gradient(135deg,rgba(15,23,42,0.9),rgba(30,41,59,0.82))]">
                        <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full border border-white/10" />
                        <span className="font-display text-5xl font-bold text-white/20 drop-shadow-[0_14px_28px_rgba(59,110,255,0.25)]">
                            {judul.charAt(0)}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950/70 via-transparent to-white/5 pointer-events-none" />

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
            <div className="p-4 sm:p-5 flex flex-col flex-1 gap-3">
                <h3 className="font-display font-semibold text-white text-base sm:text-lg leading-snug">
                    {judul}
                </h3>
                <p className="text-slate-300/80 text-sm leading-relaxed flex-1 line-clamp-3">
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

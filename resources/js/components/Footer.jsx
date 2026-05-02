import React from 'react';

const socials = [
    { label: 'GitHub',   href: 'https://github.com/rizqimr',   icon: 'GH' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/rizqimr', icon: 'LI' },
    { label: 'Email',    href: 'mailto:rizqi@email.com',        icon: '@'  },
];

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-surface-950 py-10 mt-20">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="font-display font-bold text-lg text-white">
                    MR2<span className="text-primary-500">.</span>
                </p>

                <p className="text-slate-500 text-sm text-center">
                    © {new Date().getFullYear()} M. Rizqi M.R · Logic • Experience • Solutions
                </p>

                <div className="flex items-center gap-3">
                    {socials.map(({ label, href, icon }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center
                                       text-slate-400 hover:text-white hover:bg-white/10 hover:border-primary-500/30
                                       transition-all duration-200 text-xs font-mono font-medium"
                        >
                            {icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

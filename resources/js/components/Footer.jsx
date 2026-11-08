import React from 'react';

const socials = [
    { label: 'GitHub',   href: 'https://github.com/rizqimr',   icon: 'GH' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/rizqimr', icon: 'LI' },
    { label: 'Email',    href: 'mailto:arizqiboy@gmail.com',    icon: '@'  },
];

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),#020617)] py-10 mt-16 md:mt-24">
            <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="font-display font-bold text-lg text-white tracking-tight">
                    MR2<span className="text-[#f6c76b]">.</span>
                </p>

                <p className="text-slate-400 text-sm text-center">
                    © {new Date().getFullYear()} M. Rizqi M.R · Logic · Experience · Solutions
                </p>

                <div className="flex items-center gap-3">
                    {socials.map(({ label, href, icon }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center
                                       text-slate-300 hover:text-white hover:bg-white/10 hover:border-sky-300/30
                                       hover:-translate-y-0.5 transition-all duration-200 text-xs font-mono font-semibold"
                        >
                            {icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
    { to: '/',         label: 'Beranda' },
    { to: '/projects', label: 'Proyek'  },
    { to: '/skills',   label: 'Keahlian'},
    { to: '/contact',  label: 'Kontak'  },
];

export default function Navbar({ scrolled }) {
    const [open, setOpen] = useState(false);

    const navClass = `fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
            ? 'bg-surface-950/90 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/20'
            : 'bg-transparent'
    }`;

    return (
        <nav className={navClass}>
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <NavLink to="/" className="font-display font-bold text-xl text-white">
                    MR2<span className="text-primary-500">.</span>
                </NavLink>

                {/* Desktop links */}
                <ul className="hidden md:flex items-center gap-1">
                    {links.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                end={to === '/'}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                                        isActive
                                            ? 'text-white bg-white/5'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>


                {/* Hamburger */}
                <button
                    className="md:hidden text-slate-300 hover:text-white p-2"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <div className={`w-5 h-0.5 bg-current transition-all duration-200 ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
                    <div className={`w-5 h-0.5 bg-current mt-1 transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
                    <div className={`w-5 h-0.5 bg-current mt-1 transition-all duration-200 ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden bg-surface-950/95 backdrop-blur-md border-t border-white/5 px-6 py-4">
                    <ul className="flex flex-col gap-1">
                        {links.map(({ to, label }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    end={to === '/'}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'text-white bg-white/5'
                                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`
                                    }
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}

<<<<<<< ours
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
=======
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
>>>>>>> theirs

const links = [
    { to: '/',         label: 'Beranda' },
    { to: '/projects', label: 'Proyek'  },
    { to: '/skills',   label: 'Keahlian'},
    { to: '/contact',  label: 'Kontak'  },
];

<<<<<<< ours
export default function Navbar({ scrolled }) {
    const [open, setOpen] = useState(false);

    const navClass = `fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
            ? 'bg-surface-950/90 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/20'
=======
const mobileLinks = [
    { to: '/projects', label: 'Proyek',   icon: 'projects' },
    { to: '/contact',  label: 'Kontak',   icon: 'contact'  },
    { to: '/',         label: 'Beranda',  icon: 'home',     featured: true },
    { to: '/skills',   label: 'Skill',    icon: 'skills'   },
];

function Icon({ name, className = 'w-5 h-5' }) {
    const common = {
        className,
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor',
        strokeWidth: 2.3,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
    };

    const paths = {
        home: <path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
        projects: <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5zM8 9h8M8 13h5" />,
        contact: <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5zM8 9h8M8 13h5M8 17h3" />,
        skills: <path d="M12 3v18M5 7h14M7 12h10M9 17h6" />,
        menu: <path d="M5 7h14M5 12h14M5 17h14" />,
    };

    return <svg {...common}>{paths[name]}</svg>;
}

export default function Navbar({ scrolled }) {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    const navClass = `fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
            ? 'bg-surface-950/82 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/25'
>>>>>>> theirs
            : 'bg-transparent'
    }`;

    return (
<<<<<<< ours
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
=======
        <>
            <nav className={`${navClass} hidden md:block`}>
                <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <NavLink to="/" className="font-display font-bold text-xl text-white tracking-tight">
                        MR2<span className="text-[#f6c76b]">.</span>
                    </NavLink>

                    {/* Desktop links */}
                    <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl">
                        {links.map(({ to, label }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    end={to === '/'}
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                            isActive
                                                ? 'text-white bg-white/10 shadow-inner shadow-white/5'
                                                : 'text-slate-300/80 hover:text-white hover:bg-white/10'
                                        }`
                                    }
                                >
                                    {label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Mobile menu sheet */}
            {open && (
                <div className="md:hidden fixed inset-x-4 bottom-28 z-50 rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.96))] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl">
                    <div className="mb-3 flex items-center justify-between">
                        <p className="font-display text-sm font-bold text-white">
                            MR2<span className="text-[#f6c76b]">.</span>
                        </p>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300"
                        >
                            Tutup
                        </button>
                    </div>
                    <ul className="grid grid-cols-2 gap-2">
>>>>>>> theirs
                        {links.map(({ to, label }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    end={to === '/'}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
<<<<<<< ours
                                        `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'text-white bg-white/5'
                                                : 'text-slate-400 hover:text-white hover:bg-white/5'
=======
                                        `block rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                                            isActive
                                                ? 'border-sky-300/20 bg-white/10 text-white'
                                                : 'border-white/10 bg-white/5 text-slate-300/80 hover:text-white hover:bg-white/10'
>>>>>>> theirs
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
<<<<<<< ours
        </nav>
=======

            {/* Mobile bottom dock */}
            <nav className="md:hidden fixed inset-x-3 bottom-4 z-50">
                <div className="mx-auto grid max-w-md grid-cols-5 items-end rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(2,6,23,0.9))] px-2 pb-2 pt-3 shadow-[0_16px_45px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl">
                    {mobileLinks.slice(0, 2).map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) =>
                                `flex min-w-0 flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-bold uppercase tracking-tight transition-all ${
                                    isActive ? 'bg-white/[0.07] text-sky-200' : 'text-slate-500'
                                }`
                            }
                        >
                            <Icon name={icon} className="h-5 w-5" />
                            <span className="truncate">{label}</span>
                        </NavLink>
                    ))}

                    <NavLink
                        to="/"
                        end
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                            `relative -mt-7 flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-tight transition-all ${
                                isActive ? 'text-sky-100' : 'text-slate-300'
                            }`
                        }
                    >
                        <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[6px] border-surface-950 bg-[linear-gradient(135deg,#1e293b,#0f172a)] text-sky-100 shadow-[0_10px_28px_rgba(0,0,0,0.45),0_0_0_1px_rgba(125,211,252,0.22),inset_0_1px_0_rgba(255,255,255,0.12)]">
                            <Icon name="home" className="h-6 w-6" />
                        </span>
                        <span>Beranda</span>
                    </NavLink>

                    {mobileLinks.slice(3).map(({ to, label, icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `flex min-w-0 flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-bold uppercase tracking-tight transition-all ${
                                    isActive ? 'bg-white/[0.07] text-sky-200' : 'text-slate-500'
                                }`
                            }
                        >
                            <Icon name={icon} className="h-5 w-5" />
                            <span className="truncate">{label}</span>
                        </NavLink>
                    ))}

                    <button
                        type="button"
                        onClick={() => setOpen(v => !v)}
                        className={`flex min-w-0 flex-col items-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-bold uppercase tracking-tight transition-all ${
                            open ? 'bg-white/[0.07] text-sky-200' : 'text-slate-500'
                        }`}
                        aria-expanded={open}
                        aria-label="Buka menu"
                    >
                        <Icon name="menu" className="h-5 w-5" />
                        <span>Menu</span>
                    </button>
                </div>
            </nav>
        </>
>>>>>>> theirs
    );
}

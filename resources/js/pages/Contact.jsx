import React, { useState } from 'react';
import { PROFIL } from '@data/data';
import { AnimatedText, RevealSection } from '@components/AnimatedText';

const INFO = [
    { icon: 'EM', label: 'Email',    value: PROFIL.email,              href: `mailto:${PROFIL.email}` },
    { icon: 'GH', label: 'GitHub',   value: 'github.com/rizqimr',      href: PROFIL.github },
    { icon: 'IN', label: 'LinkedIn', value: 'linkedin.com/in/rizqimr', href: PROFIL.linkedin },
    { icon: 'WA', label: 'WhatsApp', value: 'Chat via WhatsApp',       href: PROFIL.whatsapp },
];

const INIT = { nama: '', email: '', subjek: '', pesan: '' };

export default function Contact() {
    const [form, setForm] = useState(INIT);
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);

    const change = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
        if (errors[name]) setErrors(e => ({ ...e, [name]: '' }));
    };

    const validate = () => {
        const err = {};
        if (!form.nama.trim()) err.nama = 'Nama wajib diisi.';
        if (!form.email.trim()) err.email = 'Email wajib diisi.';
        else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Format email tidak valid.';
        if (!form.pesan.trim()) err.pesan = 'Pesan wajib diisi.';
        else if (form.pesan.trim().length < 10) err.pesan = 'Pesan minimal 10 karakter.';
        return err;
    };

    const submit = e => {
        e.preventDefault();
        const err = validate();
        if (Object.keys(err).length) {
            setErrors(err);
            return;
        }

        const subject = encodeURIComponent(form.subjek || `Pesan dari ${form.nama}`);
        const body = encodeURIComponent(
            `Nama: ${form.nama}\nEmail: ${form.email}\n\nPesan:\n${form.pesan}`
        );
        window.location.href = `mailto:${PROFIL.email}?subject=${subject}&body=${body}`;
        setSent(true);
        setForm(INIT);
    };

    return (
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-x-hidden">
            <div className="pointer-events-none absolute -top-24 right-12 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
            <div className="pointer-events-none absolute top-96 -left-24 h-80 w-80 rounded-full bg-[#f6c76b]/10 blur-3xl" />

            <RevealSection className="relative mb-8 sm:mb-12">
                <div className="rounded-[22px] sm:rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(30,41,59,0.72),rgba(15,23,42,0.72))] p-5 sm:p-8 md:p-10 lg:p-12 shadow-[0_28px_80px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl overflow-hidden">
                    <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-sky-300/10 blur-2xl" />
                    <div className="relative max-w-3xl">
                        <p className="mb-3 text-[10px] sm:text-xs font-bold uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#f6c76b]">Let us build</p>
                        <h1 className="font-display text-[32px] sm:text-4xl md:text-6xl font-extrabold text-white leading-tight mb-3 sm:mb-4">
                            <AnimatedText text="Hubungi Saya" type="words" el="span" />
                        </h1>
                        <p className="max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
                            <AnimatedText text="Ada proyek menarik? Kirim pesan dan saya akan merespons dalam 1x24 jam." type="clip" delay={150} el="span" />
                        </p>
                    </div>
                </div>
            </RevealSection>

            <div className="relative grid lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] gap-5 sm:gap-8 lg:gap-10 xl:gap-12">
                <RevealSection className="lg:col-span-3" direction="left">
                    <div className="rounded-[22px] sm:rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(30,41,59,0.72),rgba(15,23,42,0.78))] p-5 sm:p-6 md:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
                        <div className="mb-5 sm:mb-7 flex items-center justify-between gap-4">
                            <div>
                                <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#f6c76b]">Project Inquiry</p>
                                <h2 className="font-display font-bold text-white text-xl sm:text-2xl">Kirim Pesan</h2>
                            </div>
                            <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/10 text-sm font-mono font-bold text-sky-100">MR</div>
                        </div>

                        {sent ? (
                            <div className="text-center py-10">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-green-300/20 bg-green-400/10 text-green-300 font-bold">OK</div>
                                <h3 className="font-display font-semibold text-white text-lg mb-2">Terima Kasih!</h3>
                                <p className="text-slate-300 text-sm mb-6">Klien email Anda dibuka. Silakan kirim pesan dari sana.</p>
                                <button onClick={() => setSent(false)} className="btn-outline text-sm py-2">Kirim Lagi</button>
                            </div>
                        ) : (
                            <form onSubmit={submit} noValidate className="space-y-4 sm:space-y-5">
                                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Nama *</label>
                                        <input type="text" name="nama" value={form.nama} onChange={change} placeholder="Nama lengkap Anda" className={`input-field ${errors.nama ? 'border-red-500/50' : ''}`} />
                                        {errors.nama && <p className="mt-1 text-xs text-red-400">{errors.nama}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Email *</label>
                                        <input type="email" name="email" value={form.email} onChange={change} placeholder="email@anda.com" className={`input-field ${errors.email ? 'border-red-500/50' : ''}`} />
                                        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Subjek</label>
                                    <input type="text" name="subjek" value={form.subjek} onChange={change} placeholder="Tentang apa pesan ini?" className="input-field" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1.5">Pesan *</label>
                                    <textarea name="pesan" value={form.pesan} onChange={change} rows={5} placeholder="Tulis pesan Anda di sini..." className={`input-field resize-none ${errors.pesan ? 'border-red-500/50' : ''}`} />
                                    {errors.pesan && <p className="mt-1 text-xs text-red-400">{errors.pesan}</p>}
                                </div>

                                <button type="submit" className="btn-primary w-full justify-center">
                                    Kirim via Email
                                </button>
                                <p className="text-xs text-slate-500 text-center">
                                    Tombol ini akan membuka klien email Anda secara otomatis.
                                </p>
                            </form>
                        )}
                    </div>
                </RevealSection>

                <RevealSection className="lg:col-span-2 space-y-6" direction="right" delay={100}>
                    <div className="rounded-[22px] sm:rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(30,41,59,0.68),rgba(15,23,42,0.76))] p-5 sm:p-6 md:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
                        <h2 className="font-display font-bold text-white text-xl sm:text-2xl mb-5 sm:mb-6">Info Kontak</h2>
                        <ul className="space-y-3 sm:space-y-5">
                            {INFO.map(({ icon, label, value, href }) => (
                                <li key={label} className="flex items-start gap-3 sm:gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 transition-all duration-200 hover:border-sky-300/30 hover:bg-white/10">
                                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[linear-gradient(135deg,rgba(125,211,252,0.16),rgba(246,199,107,0.1))] border border-sky-300/20 flex items-center justify-center text-xs font-mono font-bold text-sky-100 flex-shrink-0">{icon}</div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                                        <a href={href} target="_blank" rel="noopener noreferrer" className="text-slate-100 hover:text-sky-300 transition-colors text-sm hover-underline break-all">
                                            {value}
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-[22px] sm:rounded-[26px] border border-sky-300/20 bg-gradient-to-br from-sky-300/10 via-primary-500/10 to-[#f6c76b]/10 p-5 sm:p-6 md:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
                        <h3 className="font-display font-bold text-white text-lg sm:text-xl mb-3">Tersedia untuk Freelance</h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-5">
                            Terbuka untuk proyek freelance, kolaborasi, maupun peluang kerja penuh waktu.
                        </p>
                        <div className="flex items-center gap-2 rounded-full border border-green-300/20 bg-green-400/10 px-4 py-2 w-fit">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-green-400 text-sm font-medium">Tersedia sekarang</span>
                        </div>
                    </div>
                </RevealSection>
            </div>
        </section>
    );
}

import React, { useState } from 'react';
import { PROFIL } from '@data/data';
import { AnimatedText, RevealSection } from '@components/AnimatedText';

const INFO = [
    { icon: '✉', label: 'Email',     value: PROFIL.email,                    href: `mailto:${PROFIL.email}` },
    { icon: '⬛', label: 'GitHub',    value: 'github.com/rizqimr',            href: PROFIL.github            },
    { icon: '🔗', label: 'LinkedIn',  value: 'linkedin.com/in/rizqimr',       href: PROFIL.linkedin          },
    { icon: '💬', label: 'WhatsApp',  value: 'Chat via WhatsApp',             href: PROFIL.whatsapp          },
];

const INIT = { nama: '', email: '', subjek: '', pesan: '' };

export default function Contact() {
    const [form,   setForm]   = useState(INIT);
    const [errors, setErrors] = useState({});
    const [sent,   setSent]   = useState(false);

    const change = e => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
        if (errors[name]) setErrors(e => ({ ...e, [name]: '' }));
    };

    const validate = () => {
        const err = {};
        if (!form.nama.trim())  err.nama  = 'Nama wajib diisi.';
        if (!form.email.trim()) err.email = 'Email wajib diisi.';
        else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Format email tidak valid.';
        if (!form.pesan.trim()) err.pesan = 'Pesan wajib diisi.';
        else if (form.pesan.trim().length < 10)    err.pesan = 'Pesan minimal 10 karakter.';
        return err;
    };

    const submit = e => {
        e.preventDefault();
        const err = validate();
        if (Object.keys(err).length) { setErrors(err); return; }

        // Buka klien email bawaan dengan data form
        const subject = encodeURIComponent(form.subjek || `Pesan dari ${form.nama}`);
        const body    = encodeURIComponent(
            `Nama: ${form.nama}\nEmail: ${form.email}\n\nPesan:\n${form.pesan}`
        );
        window.location.href = `mailto:${PROFIL.email}?subject=${subject}&body=${body}`;
        setSent(true);
        setForm(INIT);
    };

    return (
        <section className="max-w-6xl mx-auto px-6 pt-32 pb-24">
            {/* Header */}
            <RevealSection className="mb-16">
                <h1 className="section-title">
                    <AnimatedText text="Hubungi Saya" type="words" el="span" />
                </h1>
                <p className="section-subtitle">
                    <AnimatedText text="Ada proyek menarik? Kirim pesan dan saya akan merespons dalam 1×24 jam." type="clip" delay={150} el="span" />
                </p>
            </RevealSection>

            <div className="grid lg:grid-cols-5 gap-12">

                {/* Form (3/5) */}
                <RevealSection className="lg:col-span-3" direction="left">
                    <div className="bg-surface-900 border border-white/5 rounded-2xl p-8">
                        <h2 className="font-display font-semibold text-white text-xl mb-6">Kirim Pesan</h2>

                        {sent ? (
                            <div className="text-center py-10">
                                <div className="text-5xl mb-4">✅</div>
                                <h3 className="font-display font-semibold text-white text-lg mb-2">Terima Kasih!</h3>
                                <p className="text-slate-400 text-sm mb-6">Klien email Anda dibuka. Silakan kirim pesan dari sana.</p>
                                <button onClick={() => setSent(false)} className="btn-outline text-sm py-2">Kirim Lagi</button>
                            </div>
                        ) : (
                            <form onSubmit={submit} noValidate className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1.5">Nama *</label>
                                        <input type="text" name="nama" value={form.nama} onChange={change}
                                               placeholder="Nama lengkap Anda"
                                               className={`input-field ${errors.nama ? 'border-red-500/50' : ''}`} />
                                        {errors.nama && <p className="mt-1 text-xs text-red-400">{errors.nama}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm text-slate-400 mb-1.5">Email *</label>
                                        <input type="email" name="email" value={form.email} onChange={change}
                                               placeholder="email@anda.com"
                                               className={`input-field ${errors.email ? 'border-red-500/50' : ''}`} />
                                        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1.5">Subjek</label>
                                    <input type="text" name="subjek" value={form.subjek} onChange={change}
                                           placeholder="Tentang apa pesan ini?" className="input-field" />
                                </div>
                                <div>
                                    <label className="block text-sm text-slate-400 mb-1.5">Pesan *</label>
                                    <textarea name="pesan" value={form.pesan} onChange={change}
                                              rows={5} placeholder="Tulis pesan Anda di sini..."
                                              className={`input-field resize-none ${errors.pesan ? 'border-red-500/50' : ''}`} />
                                    {errors.pesan && <p className="mt-1 text-xs text-red-400">{errors.pesan}</p>}
                                </div>
                                <button type="submit" className="btn-primary w-full justify-center">
                                    Kirim via Email
                                </button>
                                <p className="text-xs text-slate-600 text-center">
                                    Tombol ini akan membuka klien email Anda secara otomatis.
                                </p>
                            </form>
                        )}
                    </div>
                </RevealSection>

                {/* Info (2/5) */}
                <RevealSection className="lg:col-span-2 space-y-6" direction="right" delay={100}>
                    <div className="bg-surface-900 border border-white/5 rounded-2xl p-8">
                        <h2 className="font-display font-semibold text-white text-xl mb-6">Info Kontak</h2>
                        <ul className="space-y-5">
                            {INFO.map(({ icon, label, value, href }) => (
                                <li key={label} className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center text-lg flex-shrink-0">{icon}</div>
                                    <div>
                                        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
                                        <a href={href} target="_blank" rel="noopener noreferrer"
                                           className="text-slate-200 hover:text-primary-400 transition-colors text-sm hover-underline">
                                            {value}
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-primary-500/10 to-accent-400/10 border border-primary-500/20 rounded-2xl p-8">
                        <h3 className="font-display font-semibold text-white mb-3">Tersedia untuk Freelance</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            Terbuka untuk proyek freelance, kolaborasi, maupun peluang kerja penuh waktu.
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-green-400 text-sm font-medium">Tersedia sekarang</span>
                        </div>
                    </div>
                </RevealSection>
            </div>
        </section>
    );
}

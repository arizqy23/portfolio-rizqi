// ================================================================
//  DATA PORTOFOLIO — M. RIZQI M.R
//  Edit file ini untuk mengubah semua konten website
// ================================================================

// ── Info Pribadi ─────────────────────────────────────────────
export const PROFIL = {
    nama:       'M. RIZQI M.R',
    title:      'Full-Stack Developer',
    tagline:    'Spesialis Laravel & React',
    deskripsi:  'Full-Stack Developer yang bersemangat membangun aplikasi web berkualitas tinggi. Saya fokus pada kode yang bersih, performa yang cepat, dan pengalaman pengguna yang menyenangkan.',
    foto:       'images/avatars/foto.jpg',
    email:      'arizqiboy@gmail.com',
    github:     'https://github.com/rizqimr',
    linkedin:   'https://linkedin.com/in/rizqimr',
    whatsapp:   'https://wa.me/62895367015626', // ganti dengan nomor WA Anda
    lokasi:     'Tuban, Indonesia',
    tersedia:   true, // tampilkan badge "Tersedia untuk proyek baru"
};

// ── Statistik ────────────────────────────────────────────────
export const STATS = [
    { value: '3+',  label: 'Tahun\nPengalaman',  icon: '◆' },
    { value: '20+', label: 'Proyek\nSelesai',    icon: '◈' },
    { value: '10+', label: 'Teknologi\nDikuasai',icon: '◇' },
];

// ── Proyek ───────────────────────────────────────────────────
export const PROJECTS = [
    {
        id:         1,
        judul:      'Portfolio Website',
        deskripsi:  'Website portofolio pribadi dibangun dengan Laravel 12, React 18, Vite, dan Tailwind CSS. Menampilkan proyek, skill, dan form kontak interaktif dengan animasi modern.',
        gambar:     null, // '/images/projects/portfolio.jpg'
        link:       'https://github.com/rizqimr/portfolio',
        demo_link:  'https://rizqimr.dev',
        teknologi:  ['Laravel', 'React', 'Vite', 'Tailwind CSS'],
        featured:   true,
    },
    {
        id:         2,
        judul:      'Sistem Manajemen Inventory',
        deskripsi:  'Aplikasi manajemen stok barang berbasis web dengan fitur CRUD lengkap, laporan PDF otomatis, dan sistem autentikasi multi-role (admin, gudang, pimpinan).',
        gambar:     null,
        link:       'https://github.com/rizqimr/inventory',
        demo_link:  null,
        teknologi:  ['Laravel', 'MySQL', 'Bootstrap', 'jQuery'],
        featured:   true,
    },
    {
        id:         3,
        judul:      'REST API E-Commerce',
        deskripsi:  'Backend API lengkap untuk aplikasi e-commerce menggunakan Laravel Sanctum. Fitur: produk, kategori, keranjang, order, dan integrasi payment gateway.',
        gambar:     null,
        link:       'https://sunny-indonesia.sisteminformasic.com/index.php',
        demo_link:  null,
        teknologi:  ['Laravel', 'Sanctum', 'MySQL', 'Postman'],
        featured:   true,
    },
    {
        id:         4,
        judul:      'SIAKAD Mini',
        deskripsi:  'Sistem informasi akademik sederhana dengan manajemen mahasiswa, mata kuliah, jadwal, dan nilai. Dilengkapi fitur cetak transkrip PDF.',
        gambar:     null,
        link:       'https://github.com/rizqimr/siakad',
        demo_link:  null,
        teknologi:  ['Laravel', 'MySQL', 'Bootstrap', 'DomPDF'],
        featured:   false,
    },
    {
        id:         5,
        judul:      'Admin Dashboard',
        deskripsi:  'Dashboard analytics real-time dengan grafik interaktif, manajemen pengguna, dan laporan ekspor Excel. Dibangun dengan React dan Recharts.',
        gambar:     null,
        link:       'https://github.com/rizqimr/dashboard',
        demo_link:  null,
        teknologi:  ['React', 'Recharts', 'Tailwind CSS', 'Laravel API'],
        featured:   false,
    },
    {
        id:         6,
        judul:      'Blog CMS',
        deskripsi:  'CMS blog full-featured dengan editor Markdown, manajemen kategori dan tag, sistem komentar, dan SEO-friendly URL.',
        gambar:     null,
        link:       'https://github.com/rizqimr/blog-cms',
        demo_link:  null,
        teknologi:  ['Laravel', 'Livewire', 'Alpine.js', 'Tailwind CSS'],
        featured:   false,
    },
];

// ── Skills ───────────────────────────────────────────────────
export const SKILLS = [
    // Frontend
    { id: 1,  nama: 'React',        ikon: 'RE', kategori: 'Frontend', level: 85 },
    { id: 2,  nama: 'Tailwind CSS', ikon: 'TW', kategori: 'Frontend', level: 90 },
    { id: 3,  nama: 'Vite',         ikon: 'VI', kategori: 'Frontend', level: 80 },
    { id: 4,  nama: 'JavaScript',   ikon: 'JS', kategori: 'Frontend', level: 82 },
    { id: 5,  nama: 'HTML & CSS',   ikon: 'HT', kategori: 'Frontend', level: 95 },

    // Backend
    { id: 6,  nama: 'Laravel',      ikon: 'LV', kategori: 'Backend',  level: 92 },
    { id: 7,  nama: 'PHP',          ikon: 'PH', kategori: 'Backend',  level: 90 },
    { id: 8,  nama: 'REST API',     ikon: 'AP', kategori: 'Backend',  level: 85 },
    { id: 9,  nama: 'Node.js',      ikon: 'ND', kategori: 'Backend',  level: 65 },

    // Database
    { id: 10, nama: 'MySQL',        ikon: 'MY', kategori: 'Database', level: 88 },
    { id: 11, nama: 'PostgreSQL',   ikon: 'PG', kategori: 'Database', level: 70 },
    { id: 12, nama: 'Redis',        ikon: 'RD', kategori: 'Database', level: 60 },

    // Tools
    { id: 13, nama: 'Git & GitHub', ikon: 'GT', kategori: 'Tools',    level: 88 },
    { id: 14, nama: 'Laragon',      ikon: 'LA', kategori: 'Tools',    level: 95 },
    { id: 15, nama: 'VS Code',      ikon: 'VS', kategori: 'Tools',    level: 92 },
    { id: 16, nama: 'Postman',      ikon: 'PM', kategori: 'Tools',    level: 85 },
    { id: 17, nama: 'Figma',        ikon: 'FG', kategori: 'Tools',    level: 70 },
];

// ── Kategori skill yang tersedia ─────────────────────────────
export const KATEGORI_SKILLS = ['Frontend', 'Backend', 'Database', 'Tools'];

// ── Pengalaman / Timeline ────────────────────────────────────
export const PENGALAMAN = [
    {
        tahun:    '2024 – Sekarang',
        jabatan:  'Full-Stack Developer',
        tempat:   'Freelance',
        deskripsi: 'Membangun aplikasi web skala menengah untuk berbagai klien menggunakan Laravel dan React.',
    },
    {
        tahun:    '2022 – 2024',
        jabatan:  'Junior Web Developer',
        tempat:   'PT. Contoh Teknologi',
        deskripsi: 'Mengembangkan dan memelihara aplikasi internal perusahaan berbasis Laravel.',
    },
    {
        tahun:    '2021 – 2022',
        jabatan:  'Magang Web Developer',
        tempat:   'CV. Digital Solusi',
        deskripsi: 'Belajar dan berkontribusi pada proyek website company profile dan landing page.',
    },
];

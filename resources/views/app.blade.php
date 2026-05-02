<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <title>M. RIZQI M.R – Full-Stack Developer</title>
    <meta name="description" content="Portofolio M. RIZQI M.R – Full-Stack Developer spesialis Laravel dan React." />
    <meta name="author" content="M. RIZQI M.R" />

    <!-- Open Graph -->
    <meta property="og:title" content="M. RIZQI M.R – Full-Stack Developer" />
    <meta property="og:description" content="Portofolio M. RIZQI M.R – Full-Stack Developer spesialis Laravel dan React." />
    <meta property="og:type" content="website" />

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body>
    <div id="app"></div>
</body>
</html>

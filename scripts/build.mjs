import { build } from 'esbuild';
import { cp, mkdir } from 'node:fs/promises';
await build({ entryPoints: ['src/app.jsx'], bundle: true, minify: true, sourcemap: true, outfile: 'Asset/dist/app.js', loader: { '.jsx': 'jsx' }, jsx: 'automatic', target: ['es2020'], define: { 'process.env.NODE_ENV': '"production"' } });
await mkdir('public/Asset', { recursive: true });
await cp('Asset', 'public/Asset', { recursive: true, force: true });
console.log('Portfolio built: index.html + Asset/dist/app.js + Asset/dist/app.css');

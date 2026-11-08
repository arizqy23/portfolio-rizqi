import { build } from 'esbuild';
import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await rm('public/Asset', { recursive: true, force: true });

await build({
  entryPoints: ['src/app.jsx'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: 'dist/Asset/dist/app.js',
  loader: { '.jsx': 'jsx' },
  jsx: 'automatic',
  target: ['es2020'],
  define: { 'process.env.NODE_ENV': '"production"' },
});
await mkdir('dist/Asset/img', { recursive: true });
await cp('index.html', 'dist/index.html');
await cp('Asset/img', 'dist/Asset/img', { recursive: true, force: true });
await mkdir('public/Asset', { recursive: true });
await cp('dist/Asset', 'public/Asset', { recursive: true, force: true });
console.log('Static portfolio built in dist/');

import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist/src', { recursive: true });
await Promise.all([
  cp('index.html', 'dist/index.html'),
  cp('src/main.js', 'dist/src/main.js'),
  cp('src/style.css', 'dist/src/style.css'),
]);
console.log('StarPoints production bundle created in dist/');

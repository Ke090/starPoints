import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve } from 'node:path';

const root = resolve(process.argv[2] || '.');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
const server = createServer((request, response) => {
  const requestPath = decodeURIComponent(request.url.split('?')[0]);
  let path = resolve(root, `.${requestPath === '/' ? '/index.html' : requestPath}`);
  if (!path.startsWith(root) || !existsSync(path) || statSync(path).isDirectory()) path = join(root, 'index.html');
  response.setHeader('Content-Type', `${types[extname(path)] || 'application/octet-stream'}; charset=utf-8`);
  createReadStream(path).pipe(response);
});
server.listen(4173, '0.0.0.0', () => console.log('StarPoints running at http://localhost:4173'));

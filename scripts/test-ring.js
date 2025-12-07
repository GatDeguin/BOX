import { createReadStream, promises as fs } from 'fs';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.fbx': 'application/octet-stream',
  '.bin': 'application/octet-stream',
};

async function serveStatic(directory) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const safePath = decodeURIComponent(url.pathname);
    let filePath = path.join(directory, safePath);

    try {
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
    } catch (error) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = contentTypes[extension] ?? 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    createReadStream(filePath).pipe(res);
  });

  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  return { server, url: `http://localhost:${port}` };
}

async function run() {
  const { server, url } = await serveStatic(rootDir);
  const browser = await chromium.launch({ headless: true, args: ['--ignore-certificate-errors'] });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);
  console.log(`Iniciando servidor local en ${url}`);
  const errors = [];

  page.on('pageerror', (err) => errors.push(`Page error: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(`Console error: ${msg.text()}`);
    }
  });
  page.on('requestfailed', (request) => {
    errors.push(`Request failed: ${request.url()} (${request.failure()?.errorText ?? 'unknown error'})`);
  });

  try {
    console.log('Abriendo ring.html...');
    await page.goto(`${url}/ring.html`, { waitUntil: 'commit', timeout: 120000 });
    console.log('Esperando al lienzo principal...');
    await page.waitForSelector('#scene', { timeout: 60000 });
    await page.waitForTimeout(5000);

    if (errors.length) {
      console.error('ring.html reported errors:\n' + errors.join('\n'));
      process.exitCode = 1;
      return;
    }

    console.log('ring.html smoke test completed without console errors.');
  } finally {
    await context.close();
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

run().catch((error) => {
  console.error('ring.html smoke test failed:', error);
  process.exitCode = 1;
});

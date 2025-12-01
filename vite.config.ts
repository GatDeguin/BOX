import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  build: {
    outDir: 'public',
    emptyOutDir: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/box9/index.ts'),
      output: {
        dir: 'public',
        entryFileNames: 'box9.js',
        format: 'es',
        inlineDynamicImports: true
      }
    }
  }
});

import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
      rollupOptions: {
          input: {
              index: resolve(__dirname, 'index.html'),
          },
      },
      outDir: resolve(__dirname, 'dist'),
      emptyOutDir: true,
  },
  server: {
      port: 3000,
  },
});

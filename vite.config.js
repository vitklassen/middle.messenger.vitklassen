import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';


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
  plugins: [handlebars({helpers: {isEqual: (v1, v2, options) => v1 !== v2 ? options.fn(this) : options.inverse(this)}})],
  server: {
    port: 3000,
  },
});

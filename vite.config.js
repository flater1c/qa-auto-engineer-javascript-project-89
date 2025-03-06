import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    css: true,
    globals: true,
    setupFiles: './vitest.setup.js',
    server: {
      deps: {
        inline: [/@hexlet\/.*/],
      }
    },
    deps: {
      web: {
        transformCss: true,
      },
    },
  },
});

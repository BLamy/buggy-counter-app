import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Update to '/<repo-name>/' for GitHub Pages if not using custom domain
  build: {
    sourcemap: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

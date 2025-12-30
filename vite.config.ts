import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules')) {
            if (id.includes('@mui')) return 'mui';
            if (id.includes('@tanstack')) return 'tanstack';
            return 'vendor';
          }
        },
      },
    },
  },
  base: "/test-case-app/"
})

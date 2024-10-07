import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/": "/src",
      app: "/src/app",
      features: "/src/features",
      shared: "/src/shared",
      assets: "/src/shared/assets",
      pages: "/src/pages",
    },
  }
})

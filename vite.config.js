import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
    manifest: {
      name: 'Check CU',
      short_name: 'Check rooms',
      description: 'Central university Technical support',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'cu192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'check512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
  resolve: {
    alias: {
      "@/": "/src",
      app: "/src/app",
      features: "/src/features",
      shared: "/src/shared",
      assets: "/src/shared/assets",
      pages: "/src/pages",
    },
  },
  server: {
    port: 5173,
  },

})

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
      name: 'Название вашего приложения',
      short_name: 'Краткое название',
      description: 'Описание вашего приложения',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'check192.png',
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

})

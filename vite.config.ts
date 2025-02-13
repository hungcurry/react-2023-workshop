import process from 'node:process'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production ' ? '/react-2023-workshop/' : '',
  plugins: [
    react(),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    open: true,
    port: 5080,
    host: '0.0.0.0',
    hmr: true,
  },
})

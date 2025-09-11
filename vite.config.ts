import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

const META_URL = import.meta.url

export default defineConfig({
  plugins: [react()],
  base: '/myheritage/',
  resolve: {
    alias: {
      '@shared': fileURLToPath(new URL('./src/shared', META_URL)),
      '@features': fileURLToPath(new URL('./src/features', META_URL)),
      '@store': fileURLToPath(new URL('./src/store', META_URL)),
    }
  }
})

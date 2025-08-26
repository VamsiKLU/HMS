import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/HMS/',  // <-- IMPORTANT
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs'
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Detect GitHub Pages builds to set the correct base path (e.g., /HMS/)
const repoName = 'HMS'
const isGithubCI = process.env.CI === 'true' && (process.env.GITHUB_REPOSITORY || '').length > 0
const isGithubPages = process.env.GITHUB_PAGES === 'true' || isGithubCI
const base = isGithubPages ? `/${repoName}/` : '/'

export default defineConfig({
  plugins: [react()],
  base,
  css: {
    postcss: './postcss.config.cjs'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})

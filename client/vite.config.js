// In your frontend project: vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any request starting with /api will be forwarded
      '/api': {
        target: 'http://localhost:3000', // Your backend server
        changeOrigin: true,
        // No rewrite needed here, as the target also expects /api
      },
    },
  },
})
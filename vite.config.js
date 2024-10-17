import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'invoice-frontend-production.up.railway.app', 
    port: 5173, // El puerto que estás usando
    strictPort: true,
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173,
    host: '0.0.0.0',  // This ensures the server is accessible from external IPs
  },
  build: {
    outDir: 'dist',  // Ensure this is set to 'dist'
  },
})

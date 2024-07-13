import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Ensure this is set to 'dist'
    rollupOptions: {
      output: {
        manualChunks: {
          // Define custom chunking if necessary
        }
      }
    },
    chunkSizeWarningLimit: 500,  // Adjust chunk size limit if necessary
  },
})

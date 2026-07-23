import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    // Never publish source maps in production builds. This reduces source disclosure
    // and makes client-side reverse engineering more difficult.
    sourcemap: mode === 'production' ? false : true,
  },
}))

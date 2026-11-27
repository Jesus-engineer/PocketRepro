import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  server: {
    // Keep the stuck loading state visible when the intentional error occurs.
    hmr: { overlay: false },
  },
  test: {
    environment: 'jsdom',
  },
})

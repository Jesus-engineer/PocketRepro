import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  server: {
    // La excepcion intencional no debe ocultar el boton que queda cargando.
    hmr: { overlay: false },
  },
  test: {
    environment: 'jsdom',
  },
})

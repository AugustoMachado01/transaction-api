import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'], // Carrega o arquivo de setup antes dos testes
  },
})

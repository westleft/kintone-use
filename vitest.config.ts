import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    setupFiles: './src/__mocks__/vitest.setup.ts',
    coverage: {
      provider: 'istanbul', // or 'v8'
    },
  },
})

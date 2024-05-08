import {defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    environment: "node",
    isolate: true,
    typecheck: {
      enabled: false
    },
  },
})
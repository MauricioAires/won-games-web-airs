import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
  video: false // Não gravar video em caso de sucesso no teste
})

import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',

    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
  chromeWebSecurity: false, // desativado para a uitlização do plugin do strpie
  video: false // Não gravar video em caso de sucesso no teste,
})

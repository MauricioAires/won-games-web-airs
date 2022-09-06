/// <reference types="cypress" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./index.d.ts" />
/// <reference types="@testing-library/cypress" />

// Importar os comando do @testing-library/cypress sobreponto
// os comandos padrão
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('getByDataCy', (selector, ...args) => {
  return cy.get(`[data-cy="${selector}"]`, ...args)
})

Cypress.Commands.add('getFields', (fields) => {
  fields.map(({ label }) => {
    cy.findByText(label).should('exist')
  })
})

Cypress.Commands.add('shouldBeGreaterThan', (value) => {
  cy.findByText(/^\$\d+(\.\d{1,2})?/)
    .invoke('text')
    .then(($el) => $el.replace('$', ''))
    .then(parseFloat)
    .should('be.gt', value)
})
Cypress.Commands.add('shouldBeLessThan', (value) => {
  cy.findByText(/^\$\d+(\.\d{1,2})?/)
    .invoke('text')
    .then(($el) => $el.replace('$', ''))
    .then(parseFloat)
    .should('be.lt', value)
})

Cypress.Commands.add('shouldRenderBanner', () => {
  cy.get('.slick-slider').within(() => {
    // localizar primeiro slider
    cy.findByRole('heading', {
      name: /Cyberpunk 2077/i
    })
    cy.findByRole('link', {
      name: /buy now/i
    })

    // ir para o segundo slider
    cy.get('.slick-dots :nth-child(2) > button').click()
    cy.wait(500)
    cy.findByRole('heading', {
      name: /horizon zero dawn/i
    })
    cy.findByRole('link', {
      name: /buy now/i
    })

    // ir para o terceiro slider
    cy.get('.slick-dots > :nth-child(3) > button').click()
    cy.wait(500)
    cy.findByRole('heading', {
      name: /huge promotion/i
    })
    cy.findByRole('link', {
      name: /Browse games/i
    })
  })
})

Cypress.Commands.add('shouldRenderShowcase', ({ name, highlight = false }) => {
  cy.getByDataCy(name).within(() => {
    cy.findByRole('heading', {
      name
    }).should('exist')

    // Verificar se o sliter possui no minimo 1 card
    cy.getByDataCy('game-card').should('have.length.gt', 0)

    cy.getByDataCy('highlight').should(highlight ? 'exist' : 'not.exist')

    if (highlight) {
      cy.getByDataCy('highlight').within(() => {
        cy.findByRole('link').should('have.attr', 'href')
      })
    }
  })
})

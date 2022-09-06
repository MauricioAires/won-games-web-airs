// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts"/>

import {
  priceFields,
  platformsFields,
  sortFields,
  genreFields
} from '../../src/utils/filter/fields'

describe('Explore page', () => {
  before(() => {
    cy.visit('/games')
  })
  it('should render filters columns', () => {
    cy.findByRole('heading', {
      name: /Sort by price/i
    }).should('exist')
    cy.findByRole('heading', {
      name: /^price/i
    }).should('exist')
    cy.findByRole('heading', {
      name: /Platforms/i
    }).should('exist')
    cy.findByRole('heading', {
      name: /Genres/i
    }).should('exist')

    cy.getFields(priceFields)
    cy.getFields(platformsFields)
    cy.getFields(sortFields)
    cy.getFields(genreFields)
  })

  it('should show 15 games and show more games when show more is clicked', () => {
    cy.getByDataCy('game-card').should('have.length', 15)

    cy.findByRole('button', {
      name: /show more/i
    }).click()

    cy.getByDataCy('game-card').should('have.length', 30)
  })

  it('should sort by price', () => {
    cy.findByText(/Lowest to highest/i).click()

    cy.location('href').should('contain', 'sort=price%3Aasc')

    cy.wait(500)

    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.findByText('$0.00').should('exist')
      })

    cy.findByText(/Highest to lowest/i).click()

    cy.location('href').should('contain', 'sort=price%3Adesc')

    cy.wait(500)

    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        // Verificar se o preço do jogo é maiot que zero
        cy.shouldBeGreaterThan(12)
      })
  })

  it('should order by price', () => {
    // cy.findByText(/Highest to lowest/i).click()
    cy.findByText(/Free/i).click()
    cy.location('href').should('contain', 'price_lte=0')
    cy.wait(500)
    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.findByText('$0.00').should('exist')
      })

    cy.findByText('Under $50').click()
    cy.location('href').should('contain', 'price_lte=50')
    cy.wait(500)
    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.shouldBeLessThan(50)
      })

    cy.findByText('Under $100').click()
    cy.location('href').should('contain', 'price_lte=100')
    cy.wait(500)
    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.shouldBeLessThan(100)
      })

    cy.findByText('Under $150').click()
    cy.location('href').should('contain', 'price_lte=150')
    cy.wait(500)
    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.shouldBeLessThan(150)
      })

    cy.findByText('Under $250').click()
    cy.location('href').should('contain', 'price_lte=250')
    cy.wait(500)
    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.shouldBeLessThan(250)
      })

    cy.findByText('Under $500').click()
    cy.location('href').should('contain', 'price_lte=500')
    cy.wait(500)
    cy.getByDataCy('game-card')
      .first()
      .within(() => {
        cy.shouldBeLessThan(500)
      })
  })

  it('should filter by platform and genre', () => {
    cy.findByText(/windows/i).click()
    cy.location('href').should('contain', 'platforms=windows')

    cy.findByText(/linux/i).click()
    cy.location('href').should('contain', 'platforms=linux')

    cy.findByText(/mac os/i).click()
    cy.location('href').should('contain', 'platforms=mac')

    cy.findByText(/action/i).click()
    cy.location('href').should('contain', 'categories=action')
  })

  it('should return empty when no games match', () => {
    cy.visit('/games')

    // grupo que sabemos que não tem  jogos
    cy.findByText(/free/i).click()
    cy.findByText(/linux/i).click()
    cy.findByText(/sports/i).click()

    cy.getByDataCy('game-card').should('not.exist')
    cy.findByText(/We didn't find any games with this filter/).should('exist')
  })
})

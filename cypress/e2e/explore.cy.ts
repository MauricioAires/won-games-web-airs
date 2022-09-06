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

  it('should order by price', () => {
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
        cy.findByText('$0.00').should('not.exist')
      })
  })
})

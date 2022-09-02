// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts"/>

describe('Game Page', () => {
  before(() => {
    cy.visit('/game/cyberpunk-2077')
  })

  it('should render game page sections', () => {
    cy.getByDataCy('game-info').within(() => {
      cy.findByRole('heading', {
        name: /cyberpunk 2077/i
      }).should('exist')

      cy.findByText(/^Cyberpunk 2077 is an open-world, action-adv/i).should(
        'exist'
      )

      cy.findByText(/\$59.99/).should('exist')

      cy.findByRole('button', {
        name: /add to cart/i
      }).should('exist')
    })

    // gallery
    cy.findAllByRole('button', {
      name: /thumb -/i
    }).should('have.length.gt', 0)

    // content
    cy.getByDataCy('content').within(() => {
      cy.findByRole('heading', {
        name: /description/i
      })
    })

    // bestpratices -> sempre fazer encadeamento para usar o children
    // nunca utilizar um escopo
    cy.getByDataCy('content').children().should('have.length.at.least', 2)

    // detaisl
    cy.getByDataCy('game-details').within(() => {
      cy.findByRole('heading', {
        name: /Game detail/i
      }).should('exist')
      cy.findByRole('heading', {
        name: /Developer/i
      }).should('exist')
      cy.findByRole('heading', {
        name: /Release Date/i
      }).should('exist')
      cy.findByRole('heading', {
        name: /Platforms/i
      }).should('exist')
      cy.findByRole('heading', {
        name: /Publisher/i
      }).should('exist')
      cy.findByRole('heading', {
        name: /Rating/i
      }).should('exist')
      cy.findByRole('heading', {
        name: /Genres/i
      }).should('exist')

      cy.findAllByText(/CD PROJEKT RED/i).should('have.length', 2)
      cy.findByText(/Dec 8, 2020/i).should('exist')
      cy.findByRole('img', {
        name: /windows/i
      }).should('exist')
      cy.findByText(/free/i).should('exist')
      cy.findByText('Role-playing / Action / Sci-fi').should('exist')
    })

    cy.shouldRenderShowcase({
      name: 'Upcoming Games',
      highlight: true
    })
    cy.shouldRenderShowcase({
      name: 'You may like these games',
      highlight: false
    })
  })

  it('should add/remove game in cart', () => {
    cy.getByDataCy('game-info').within(() => {
      cy.findByRole('button', { name: /add to cart/i }).click()
      cy.findByRole('button', { name: /remove from cart/i }).should('exist')
    })

    const cardButton = cy.findAllByLabelText(/cart items/i).first()

    cardButton.should('have.text', 1).click()

    cy.getByDataCy('cart-list').within(() => {
      cy.findByRole('heading', {
        name: /cyberpunk 2077/i
      })
    })

    cardButton.should('have.text', 1).click()

    cy.getByDataCy('game-info').within(() => {
      cy.findByRole('button', { name: /remove from cart/i }).click()
      cy.findByRole('button', { name: /add to cart/i }).should('exist')
    })

    cy.findAllByLabelText(/cart items/i).should('not.exist')
  })
})

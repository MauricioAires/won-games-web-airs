import { createUser } from './../support/generate'
describe('Checkout', () => {
  let user: User

  describe('Free Games', () => {
    before(() => {
      user = createUser()
    })

    it('should buy free games', () => {
      cy.visit('/sign-up')
      // criar um usuário
      cy.signUp(user)
      cy.url().should('eq', `${Cypress.config().baseUrl}/`)
      // ir para explore page
      cy.findByRole('link', { name: /explore/i }).click()
      cy.url().should('eq', `${Cypress.config().baseUrl}/games`)
      // filtrar pro jogos free
      cy.findByLabelText(/Free/).click()
      cy.url().should('contain', 'price_lte=0')
      cy.wait(500)
      // cy.wait(500)
      // adicionar o jogo ao carrinho
      cy.addToCartByIndex(0)
      // verificar se o carrinho tem 1 jogo 3 abrir dropdown
      cy.findByRole('button', {
        name: /Cart Items/i
      })
        .should('have.text', 1)
        .click()

      cy.getByDataCy('cart-list').within(() => {
        cy.findByRole('link', {
          name: /buy it now/i
        }).click()
      })
      // encontrar um texto de só jogos free
      cy.url().should('eq', `${Cypress.config().baseUrl}/cart`)

      cy.findByText(/Only free games, click buy and enjoy!/i).should('exist')

      // clicar para comprar

      cy.findByRole('button', { name: /buy now/i }).click()
      // redirecionar para a pagina de sucess

      cy.url().should('eq', `${Cypress.config().baseUrl}/success`)
      cy.findByText(/Your purchase was successful!/i).should('exist')
      // mostrar o texto de sucesso

      cy.findByRole('link', { name: /orders list/i }).click()

      cy.url().should('eq', `${Cypress.config().baseUrl}/profile/orders`)
    })

    it('should show games in order page', () => {
      cy.visit('/profile/orders')
      cy.location('href').should(
        'eq',
        `${Cypress.config().baseUrl}/sign-in?callbackUrl=/profile/orders`
      )

      cy.signIn(user.email, user.password)
      cy.location('href').should(
        'eq',
        `${Cypress.config().baseUrl}/profile/orders`
      )

      cy.getByDataCy('game-item').should('have.length', 1)
    })
  })
  // describe('Paid Games', () => {})
})

describe('Cart', () => {
  it('should add game in the cart and remove', () => {
    cy.visit('/')

    cy.addToCartByIndex(0)
    cy.addToCartByIndex(1)
    cy.addToCartByIndex(2)

    cy.findByRole('button', { name: /cart items/i }).should('have.text', 3)

    cy.findByRole('button', { name: /cart items/i }).click()

    cy.getByDataCy('cart-list').within(() => {
      cy.findAllByRole('heading').should('have.length', 3)
    })

    cy.findByRole('button', { name: /cart items/i }).click()

    cy.removeFromCartByIndex(0)
    cy.removeFromCartByIndex(1)
    cy.removeFromCartByIndex(2)

    cy.findByRole('button', { name: /cart items/i }).should('not.exist')

    cy.findAllByLabelText(/shopping cart/i)
      .first()
      .click()

    cy.getByDataCy('cart-list').within(() => {
      cy.findByRole('heading', { name: /Your cart is empty/i }).should('exist')
    })
  })
})

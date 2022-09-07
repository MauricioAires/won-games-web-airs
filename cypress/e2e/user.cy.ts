// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts"/>

import { createUser } from '../support/generate'

describe('User', () => {
  it('should sign up', () => {
    const user = createUser()
    cy.visit('/sign-up')

    cy.signUp(user)

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

    cy.findByRole('button', {
      name: user.username
    }).should('exist')
  })

  it('should sign in an sign out', () => {
    cy.visit('/sign-in')

    cy.signIn()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    // cy.wait(500)

    cy.findByRole('button', { name: /cypress/i }).click()
    cy.findByRole('button', { name: /sign out/i }).click()

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)

    cy.findByRole('link', { name: /sign in/i }).should('exist')
    cy.findByRole('button', { name: /cypress/i }).should('not.exist')
  })

  it.only('should sign the user and redirect to the page that it was defined previously', () => {
    cy.visit('/profile/me')

    // redirecionar para o sign in com a callbacmdo profile/me
    cy.location('href').should(
      'eq',
      `${Cypress.config().baseUrl}/sign-in?callbackUrl=/profile/me`
    )

    // fazer o sign in
    cy.signIn()

    // espero ser redirecionado para o profile/me
    cy.location('href').should('eq', `${Cypress.config().baseUrl}/profile/me`)

    cy.findByLabelText(/name/i).should('have.value', 'cypress')
    cy.findByLabelText(/e-mail/i).should('have.value', 'e2e@wongame.com')
  })
})

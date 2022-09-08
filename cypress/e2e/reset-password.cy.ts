// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts"/>

describe('Reset Password', () => {
  it('should show error if password does not match', () => {
    cy.visit('/reset-password?code=anythingcode')

    cy.findByPlaceholderText(/^password/i).type('123')
    cy.findByPlaceholderText(/confirm password/i).type('321')

    cy.findByRole('button', { name: /update password/i }).click()

    cy.findByText(/confirm password does not match with password/i).should(
      'exist'
    )
  })

  it('should show erro if code is not valid', () => {
    cy.intercept('POST', '**/auth/reset-password', (res) => {
      res.reply({
        status: 400,
        body: {
          error: 'Bad Request',
          message: [
            {
              messages: [
                {
                  message: 'Incorrect code provided'
                }
              ]
            }
          ]
        }
      })
    })
    cy.visit('/reset-password?code=wrog_code')

    cy.findByPlaceholderText(/^password/i).type('123')
    cy.findByPlaceholderText(/confirm password/i).type('123')

    cy.findByRole('button', { name: /update password/i }).click()

    cy.findByText(/Incorrect code provided/i).should('exist')
  })

  it('should fill the input and redirect to the home page with the user signed in', () => {
    /// entrar na pagina de reset

    // rota do nosso backend
    cy.intercept('POST', '**/auth/reset-password', {
      statusCode: 200,
      body: {
        user: {
          email: 'cypres@gmail.com'
        }
      }
    })

    // rota do credential do next/auth
    cy.intercept('POST', '**/auth/callback/credentials*', {
      statusCode: 200,
      body: {
        user: {
          email: 'cypres@gmail.com'
        }
      }
    })

    // rota de session do next-auth
    cy.intercept('GET', '**/auth/session*', {
      statusCode: 200,
      body: {
        user: {
          name: 'cypress',
          email: 'cypres@gmail.com'
        }
      }
    })

    // usuário vai entrar na pagina de reset
    cy.visit('/reset-password?code=valid_code')
    // prenceher as senhas ( com o token valido)
    cy.findByPlaceholderText(/^password/i).type('123')
    cy.findByPlaceholderText(/confirm password/i).type('123')

    cy.findByRole('button', { name: /update password/i }).click()

    // o sign in acontece no background
    // redireciona para a home
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    // e tem o usuário logado com o nome no  meu
    cy.findByRole('button', { name: /cypress/i }).should('exist')
  })
})

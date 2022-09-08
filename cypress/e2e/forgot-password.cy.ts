// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../support/index.d.ts"/>

describe('Fogot password', () => {
  // happy path
  it('should fill the input and receive a success message', () => {
    // primeiro eu interecepto qualquer chamada
    // respondo com sucesso
    cy.intercept('POST', '**/auth/forgot-password', (res) => {
      res.reply({
        statusCode: 200,
        body: {
          ok: true
        }
      })

      expect(res.body.email).to.eq('ci@wongames.com')
    })

    cy.visit('/forgot-password')

    cy.findByPlaceholderText(/email/i).type('ci@wongames.com')

    cy.findByRole('button', {
      name: /send email/i
    }).click()

    // eu espro receber a mensaem de sucesso
    cy.findByText(/You just received an email!/i).should('exist')
  })

  it('should fill the input with an invalid email and receive an error', () => {
    // tercepar a chamada
    // retornar um erro
    cy.intercept('POST', '**/auth/forgot-password', (res) => {
      res.reply({
        status: 400,
        body: {
          error: 'Bad Request',
          message: [
            {
              messages: [
                {
                  message: 'This email does not exist'
                }
              ]
            }
          ]
        }
      })
    })

    // espero uma mensagem de erro

    cy.visit('/forgot-password')

    cy.findByPlaceholderText(/email/i).type('wrong@wongames.com')

    cy.findByRole('button', {
      name: /send email/i
    }).click()

    cy.findByText(/This email does not exist/i).should('exist')
  })
})

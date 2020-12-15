describe('Login', () => {
  it('Can login and out', () => {
    cy.visit('/account')
    cy.get("[data-cy='email']").clear().type('vinney@exnil.io')
    cy.get("[data-cy='password']").clear().type('asdfasdf')
    cy.get("[data-cy='login-button']").click()
    cy.contains("Hello, Vinney Cavallo")
    cy.get("[data-cy='logout-button']").click()
    cy.contains("Recipes!")
  })

  describe('Signup', () => {
    beforeEach(() => {
      cy.visit('/dev/refresh-seeds')
      cy.contains('Refreshed: true')
    })

    it('Can create an account', () => {
      cy.visit('/signup')
      cy.get("[data-cy='name']").clear().type('Bob')
      cy.get("[data-cy='email']").clear().type('bob@example.com')
      cy.get("[data-cy='password']").clear().type('password')
      cy.get("[data-cy='passwordConfirmation']").clear().type('password')
      cy.get("[data-cy='signupButton']").click()
      cy.contains("Hello, Bob")
    })

    it('Passwords must match', () => {
      cy.visit('/dev/refresh-seeds')
      cy.contains('Refreshed: true')

      cy.visit('/signup')
      cy.get("[data-cy='name']").clear().type('Bob')
      cy.get("[data-cy='email']").clear().type('bob@example.com')
      cy.get("[data-cy='password']").clear().type('password')
      cy.get("[data-cy='passwordConfirmation']").clear().type('somethingelse')
      cy.get("[data-cy='signupButton']").click()
      cy.contains("Passwords don't match")
    })
  })

})

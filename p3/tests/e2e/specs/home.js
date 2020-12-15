// https://docs.cypress.io/api/introduction/api.html

describe('Sanity test homepage', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('Recipes!')
  })
})

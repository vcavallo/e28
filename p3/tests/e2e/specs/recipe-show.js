
describe('Recipe show page', () => {
  beforeEach(() => {
    cy.visit('/dev/refresh-seeds')
    cy.contains('Refreshed: true')
  })

  let recipe = {
    id: 1,
    name: "Hardboiled Egg",
    instructions: "Put the egg in the water and boil it. Until its hard and boiled."
  }

  it('Contains the recipe name and instructions', () => {
    cy.visit(`/recipes/${ recipe.id }`)
    cy.contains(recipe.name)
    cy.contains(recipe.instructions)
  })

  it('Can add components to recipe', () => {
    let newComponent = {
      name: 'salt',
      quantity: 1,
      unit: 'pinch',
    }
    cy.visit(`/recipes/${ recipe.id }`)
    cy.get('ul div').its('length').should('be', 2)
    cy.get('input#componentName').clear().type(newComponent.name);
    cy.get('input#componentQty').clear().type(newComponent.quantity);
    cy.get('input#componentUnit').clear().type(newComponent.unit);
    cy.get('button[type=submit]').click()
    cy.get('ul div').its('length').should('be', 3)
    cy.contains(`${ newComponent.quantity } ${ newComponent.unit }`)
    cy.contains(`x ${ newComponent.name }`)
  })
})

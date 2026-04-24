describe('Checkout', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
  })

  it('completa el flujo de checkout', () => {
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('Juan')
    cy.get('[data-test="lastName"]').type('Pérez')
    cy.get('[data-test="postalCode"]').type('06600')
    cy.get('[data-test="continue"]').click()
    cy.get('.summary_info').should('be.visible')
    cy.get('[data-test="finish"]').click()
    cy.get('.complete-header').should('contain', 'Thank you for your order!')
  })

  it('muestra error si el formulario está incompleto', () => {
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="error"]').should('be.visible')
  })
})

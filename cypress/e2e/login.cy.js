describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('login exitoso con usuario válido', () => {
    cy.fixture('users').then(({ standard }) => {
      cy.get('#user-name').type(standard.username)
      cy.get('#password').type(standard.password)
      cy.get('#login-button').click()
      cy.url().should('include', '/inventory')
      cy.get('.inventory_list').should('be.visible')
    })
  })

  it('muestra error con usuario bloqueado', () => {
    cy.fixture('users').then(({ locked }) => {
      cy.get('#user-name').type(locked.username)
      cy.get('#password').type(locked.password)
      cy.get('#login-button').click()
      cy.get('[data-test="error"]').should('contain', 'Sorry, this user has been locked out')
    })
  })

  it('muestra error con credenciales vacías', () => {
    cy.get('#login-button').click()
    cy.get('[data-test="error"]').should('be.visible')
  })
})

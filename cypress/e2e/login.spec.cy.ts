describe('Login Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/login')
    cy.contains('SrfGroup')
  })

  it('Should not login if the form is invalid', () => {
    cy.visit('/');
    cy.url().should('contain', 'login')

    // Insert wrong values
    cy.get('[formControlName="email"]').type('test')
    cy.get('[formControlName="password"]').type('test')
    cy.get('[data-cy="submit-login"]').click({force: true})
    cy.url().should('not.include', 'private')
  })

  it('Should login if the form is valid', () => {
    cy.visit('/');
    cy.url().should('contain', 'login')

    // Insert real values
    cy.get('[formControlName="email"]').type('sami@rahal.tn')
    cy.get('[formControlName="password"]').type('rahal')
    cy.get('[data-cy="submit-login"]').click({force: true})
    cy.url().should('include', 'private')
  })

})

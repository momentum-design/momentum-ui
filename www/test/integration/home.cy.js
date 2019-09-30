describe('Home page', function() {
  describe('Test the top nav', () => {
    it('Getting Started should navigate to getting-started/designers', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/`)
        .get('[data-cy=topbar-getting-started]')
        .click()
        .url()
        .should('include', 'getting-started');
    });
    it('Guidelines should navigate to guidelines/forms-and-form-validation', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/`)
        .get('[data-cy=topbar-guidelines]')
        .click()
        .url()
        .should('include', 'guidelines');
    });
    it('Styles should navigate to styles', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/`)
        .get('[data-cy=topbar-styles]')
        .click()
        .url()
        .should('include', 'styles');
    });
    it('Components should navigate to components', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/`)
        .get('[data-cy=topbar-components]')
        .click()
        .url()
        .should('include', 'components');
    });
  });
});

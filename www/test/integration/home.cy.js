describe('Home page', function() {
  describe('Test the top nav', () => {
    it('System should navigate to system', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/`)
        .get('[data-cy=topbar-system]')
        .click()
        .url()
        .should('include', 'system');
    });
    it('Tokens should navigate to tokens', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/`)
        .get('[data-cy=topbar-tokens]')
        .click()
        .url()
        .should('include', 'tokens');
    });
    it('Components should navigate to components', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/`)
        .get('[data-cy=topbar-components]')
        .click()
        .url()
        .should('include', 'components');
    });
    it('Icons should navigate to icons', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/`)
        .get('[data-cy=topbar-icons]')
        .click()
        .url()
        .should('include', 'icons');
    });
    it('Personality should navigate to personality', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/`)
        .get('[data-cy=topbar-personality]')
        .click()
        .url()
        .should('include', 'personality');
    });
  });
});

describe('Home page', function() {
  const visitHome = () => {
    cy.visit('/');
    cy.get('.docs-home-pop-content-close').click();
  };

  describe('Test the top nav', () => {
    it('System should navigate to system', () => {
      visitHome();
      cy.get('[data-cy=topbar-system]')
        .click()
        .url()
        .should('include', 'system');
    });
    it('Tokens should navigate to tokens', () => {
      visitHome();
      cy.get('[data-cy=topbar-tokens]')
        .click()
        .url()
        .should('include', 'tokens');
    });
    it('Components should navigate to components', () => {
      visitHome();
      cy.get('[data-cy=topbar-components]')
        .click()
        .url()
        .should('include', 'components');
    });
    it('Icons should navigate to icons', () => {
      visitHome();
      cy.get('[data-cy=topbar-icons]')
        .click()
        .url()
        .should('include', 'icons');
    });
    it('Personality should navigate to personality', () => {
      visitHome();
      cy.get('[data-cy=topbar-personality]')
        .click()
        .url()
        .should('include', 'personality');
    });
  });
});

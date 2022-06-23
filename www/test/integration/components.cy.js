describe('Components pages', function() {
  describe('Test the components overview page', () => {
    it('Has app', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/components`)
        .get('#app')
        .should('have.class', 'md');
    });
  });
});

describe('@momentum-ui/core', function() {
  it('snapshot of menu', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/menu`)
      .get('.md-menu')
      .should('be.visible')
      .percySnapshot();
  });
});

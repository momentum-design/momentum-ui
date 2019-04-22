describe('@momentum-ui/core', function() {
  it.skip('snapshot of drawer', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/drawer`)
      .get('.md-drawer')
      .should('be.visible')
      .percySnapshot();
  });
});

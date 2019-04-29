describe('@momentum-ui/core', function() {
  it.skip('snapshot of list', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/list`)
      .get('.md-list')
      .should('be.visible')
      .percySnapshot();
  });
});

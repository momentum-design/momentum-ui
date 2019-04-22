describe('@momentum-ui/core', function() {
  it.skip('snapshot of data-table', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/data-table`)
      .get('.md-data-table')
      .should('be.visible')
      .percySnapshot();
  });
});

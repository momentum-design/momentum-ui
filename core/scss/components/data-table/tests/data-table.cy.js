describe('@collab-ui/core', function() {
  it.skip('snapshot of data-table', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/data-table`)
      .get('.cui-data-table')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

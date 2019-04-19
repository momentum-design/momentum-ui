describe('@collab-ui/core', function() {
  it.skip('snapshot of drawer', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/drawer`)
      .get('.cui-drawer')
      .should('be.visible')
      .percySnapshot();
  });
});

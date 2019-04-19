describe('@collab-ui/core', function() {
  it.skip('snapshot of chip', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/chip`)
      .get('.cui-accordion')
      .should('be.visible')
      .percySnapshot();
  });
});

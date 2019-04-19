describe('@collab-ui/core', function() {
  it.skip('snapshot of list', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/list`)
      .get('.cui-list')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

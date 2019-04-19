describe('@collab-ui/core', function() {
  it('snapshot of tabs', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/tabs`)
      .get('.cui-tab')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

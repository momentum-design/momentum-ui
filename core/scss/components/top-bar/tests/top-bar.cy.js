describe('@collab-ui/core', function() {
  it('snapshot of top-bar', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/top-bar`)
      .get('.cui-top-bar')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

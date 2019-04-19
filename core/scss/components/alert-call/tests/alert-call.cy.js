describe('@collab-ui/core', function() {
  it('snapshot of alert-call', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/alert-call`)
      .get('.cui-alert--call')
      .should('be.visible')
      .percySnapshot();
  });
});

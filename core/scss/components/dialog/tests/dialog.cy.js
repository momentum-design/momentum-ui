describe('@collab-ui/core', function() {
  it('snapshot of dialog', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/dialog`)
      .get('.cui-modal--dialog')
      .should('be.visible')
      .percySnapshot();
  });
});

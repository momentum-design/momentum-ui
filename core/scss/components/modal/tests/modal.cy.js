describe('@collab-ui/core', function() {
  it('snapshot of modal', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/modal`)
      .get('.cui-modal')
      .should('be.visible')
      .percySnapshot();
  });
});

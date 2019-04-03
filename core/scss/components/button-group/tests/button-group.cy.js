describe('@collab-ui/core', function() {
  it('snapshot of button-group', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/button-group`)
      .get('.cui-button-group')
      .should('be.visible')
      .percySnapshot();
  });
});

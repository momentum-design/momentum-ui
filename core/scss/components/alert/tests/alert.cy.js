describe('@collab-ui/core', function() {
  it('snapshot of alert', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/alert`)
      .get('.cui-alert')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

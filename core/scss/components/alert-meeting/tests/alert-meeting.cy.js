describe('@collab-ui/core', function() {
  it('snapshot of alert-meeting', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/alert-meeting`)
      .get('.cui-alert--meeting')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

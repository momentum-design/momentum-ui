describe('@collab-ui/core', function() {
  it('snapshot of loader', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/loader`)
      .get('.cui-spinner-progress')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

describe('@collab-ui/core', function() {
  it.skip('snapshot of call-control', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/call-control`)
      .get('.cui-call-control')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

describe('@momentum-ui/core', function() {
  it.skip('snapshot of call-control', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/call-control`)
      .get('.md-call-control')
      .should('be.visible')
      .percySnapshot();
  });
});

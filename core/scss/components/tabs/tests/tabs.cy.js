describe('@momentum-ui/core', function() {
  it('snapshot of tabs', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/tabs`)
      .get('.md-tab')
      .should('be.visible')
      .percySnapshot();
  });
});

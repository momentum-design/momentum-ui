describe('@momentum-ui/core', function() {
  it('snapshot of top-bar', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/top-bar`)
      .get('.md-top-bar')
      .should('be.visible')
      .percySnapshot();
  });
});

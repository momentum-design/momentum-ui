describe('@momentum-ui/core', function() {
  it('snapshot of pagination', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/pagination`)
      .get('.pagination')
      .should('be.visible')
      .percySnapshot();
  });
});

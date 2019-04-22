describe('@momentum-ui/core', function() {
  it('snapshot of input-search', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/input-search`)
      .get('.md-search-input')
      .should('be.visible')
      .percySnapshot();
  });
});

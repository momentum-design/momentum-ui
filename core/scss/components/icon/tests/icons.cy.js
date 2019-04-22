describe('@momentum-ui/core', function() {
  it('snapshot of icon', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/icon`)
      .get('.md-icon')
      .should('be.visible')
      .percySnapshot();
  });
});

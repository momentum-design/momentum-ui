describe('@momentum-ui/core', function() {
  it('snapshot of space-list', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/space-list`)
      .get('.md-list-item--space')
      .should('be.visible')
      .percySnapshot();
  });
});

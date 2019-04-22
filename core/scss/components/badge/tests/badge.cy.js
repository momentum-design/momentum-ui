describe('@momentum-ui/core', function() {
  it('snapshot of badge', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/badge`)
      .get('.md-badge')
      .should('be.visible')
      .percySnapshot();
  });
});

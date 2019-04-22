describe('@momentum-ui/core', function() {
  it('snapshot of avatar', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/avatar`)
      .get('.md-avatar')
      .should('be.visible')
      .percySnapshot();
  });
});

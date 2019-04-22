describe('@momentum-ui/core', function() {
  it('snapshot of toggle-switch', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/toggle-switch`)
      .get('.md-toggle-switch')
      .should('be.visible')
      .percySnapshot();
  });
});

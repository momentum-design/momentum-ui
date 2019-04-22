describe('@momentum-ui/core', function() {
  it('snapshot of alert', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/alert`)
      .get('.md-alert')
      .should('be.visible')
      .percySnapshot();
  });
});

describe('@momentum-ui/core', function() {
  it('snapshot of alert-banner', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/alert-banner`)
      .get('.md-alert-banner')
      .should('be.visible')
      .percySnapshot();
  });
});

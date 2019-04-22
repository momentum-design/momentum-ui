describe('@momentum-ui/core', function() {
  it('snapshot of alert-call', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/alert-call`)
      .get('.md-alert--call')
      .should('be.visible')
      .percySnapshot();
  });
});

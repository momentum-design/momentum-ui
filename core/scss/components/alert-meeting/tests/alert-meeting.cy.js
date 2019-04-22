describe('@momentum-ui/core', function() {
  it('snapshot of alert-meeting', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/alert-meeting`)
      .get('.md-alert--meeting')
      .should('be.visible')
      .percySnapshot();
  });
});

describe('@momentum-ui/core', function() {
  it('snapshot of loader', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/loader`)
      .get('.md-spinner-progress')
      .should('be.visible')
      .percySnapshot();
  });
});

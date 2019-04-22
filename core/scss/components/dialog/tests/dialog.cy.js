describe('@momentum-ui/core', function() {
  it('snapshot of dialog', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/dialog`)
      .get('.md-modal--dialog')
      .should('be.visible')
      .percySnapshot();
  });
});

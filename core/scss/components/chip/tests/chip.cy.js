describe('@momentum-ui/core', function() {
  it.skip('snapshot of chip', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/chip`)
      .get('.md-accordion')
      .should('be.visible')
      .percySnapshot();
  });
});

describe('@momentum-ui/core', function() {
  it('snapshot of select', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/select`)
      .get('.md-select')
      .should('be.visible')
      .percySnapshot();
  });
});

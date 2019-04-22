describe('@momentum-ui/core', function() {
  it('snapshot of slider', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/slider`)
      .get('.md-slider')
      .should('be.visible')
      .percySnapshot();
  });
});

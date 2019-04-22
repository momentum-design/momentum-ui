describe('@momentum-ui/core', function() {
  it('snapshot of accordion', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/accordion`)
      .get('.md-accordion')
      .should('be.visible')
      .percySnapshot();
  });
});

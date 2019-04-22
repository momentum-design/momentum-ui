describe('@momentum-ui/core', function() {
  it('snapshot of date-picker', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/date-picker`)
      .get('.md-date-picker')
      .should('be.visible')
      .percySnapshot();
  });
});

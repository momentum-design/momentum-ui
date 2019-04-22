describe('@momentum-ui/core', function() {
  it.skip('snapshot of date-range-picker', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/date-range-picker`)
      .get('.md-date-range-picker')
      .should('be.visible')
      .percySnapshot();
  });
});

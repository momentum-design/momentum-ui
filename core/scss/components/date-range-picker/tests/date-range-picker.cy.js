describe('@collab-ui/core', function() {
  it.skip('snapshot of date-range-picker', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/date-range-picker`)
      .get('.cui-date-range-picker')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

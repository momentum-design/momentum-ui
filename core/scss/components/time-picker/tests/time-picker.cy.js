describe('@collab-ui/core', function() {
  it('snapshot of time-picker', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/time-picker`)
      .get('.cui-timepicker-container')
      .should('be.visible')
      .percySnapshot();
  });
});

describe('@momentum-ui/core', function() {
  it('snapshot of time-picker', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/time-picker`)
      .get('.md-timepicker-container')
      .should('be.visible')
      .percySnapshot();
  });
});

describe('@collab-ui/core', function() {
  it('snapshot of tooltips', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/tooltips`)
      .get('.cui-tooltip .cui-event-overlay__children')
      .should('be.visible')
      .percySnapshot();
  });
});

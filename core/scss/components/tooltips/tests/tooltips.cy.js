describe('@collab-ui/core', function() {
  it('snapshot of tooltips', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/tooltips`)
      .get('.md-tooltip .md-event-overlay__children')
      .should('be.visible')
      .percySnapshot();
  });
});

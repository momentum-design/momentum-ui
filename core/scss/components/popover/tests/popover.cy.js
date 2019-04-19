describe('@collab-ui/core', function() {
  it('snapshot of popover', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/popover`)
      .get('.cui-event-overlay__children')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

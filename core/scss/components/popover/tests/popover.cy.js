describe('@momentum-ui/core', function() {
  it('snapshot of popover', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/popover`)
      .get('.md-event-overlay__children')
      .should('be.visible')
      .percySnapshot();
  });
});

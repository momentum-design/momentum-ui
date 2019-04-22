describe('@momentum-ui/core', function() {
  it('snapshot of button-group', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/button-group`)
      .get('.md-button-group')
      .should('be.visible')
      .percySnapshot();
  });
});

describe('@momentum-ui/core', function() {
  it('snapshot of combo-box', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/combo-box`)
      .get('.md-combo-box .md-input-group')
      .should('be.visible')
      .percySnapshot();
  });
});

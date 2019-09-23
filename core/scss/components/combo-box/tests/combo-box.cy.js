describe('@momentum-ui/core', function() {
  it('snapshot of combo-box', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/combo-box`)
      .get('.md-combo-box .md-input-container')
      .should('be.visible')
      .percySnapshot();
  });
});

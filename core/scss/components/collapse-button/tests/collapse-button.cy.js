describe('@momentum-ui/core', function() {
  it('snapshot of collapse button', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/collapse-button`)
      .get('.md-collapse-button')
      .should('be.visible')
      .percySnapshot();
  });
});

describe('@momentum-ui/core', function() {
  it('snapshot of button', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/button`)
      .get('.md-button')
      .should('be.visible')
      .percySnapshot();
  });
});

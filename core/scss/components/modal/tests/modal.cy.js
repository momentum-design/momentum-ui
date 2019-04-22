describe('@momentum-ui/core', function() {
  it('snapshot of modal', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/modal`)
      .get('.md-modal')
      .should('be.visible')
      .percySnapshot();
  });
});

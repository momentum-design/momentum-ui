describe('@momentum-ui/core', function() {
  it('snapshot of card', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/card`)
      .get('.md-cardv2')
      .should('be.visible')
      .percySnapshot();
  });
});

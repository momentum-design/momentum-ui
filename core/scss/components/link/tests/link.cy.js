describe('@momentum-ui/core', function() {
  it('snapshot of link', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/link`)
      .get('.md-link')
      .should('be.visible')
      .percySnapshot();
  });
});

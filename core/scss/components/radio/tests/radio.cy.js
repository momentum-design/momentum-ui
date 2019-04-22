describe('@momentum-ui/core', function() {
  it('snapshot of radio', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/radio`)
      .get('.md-radio')
      .should('be.visible')
      .percySnapshot();
  });
});

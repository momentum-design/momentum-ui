describe('@momentum-ui/react', function() {
  it('snapshot of radio', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/radio`)
      .get('#radioNestedHelp24')
      .should('be.visible')
      .percySnapshot();
  });
});

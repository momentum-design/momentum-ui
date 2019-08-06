describe('@momentum-ui/react', function() {
  it('snapshot of input', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/kitchen-sink`)
      .get('.md-input')
      .should('be.visible')
      .percySnapshot();
  });
});

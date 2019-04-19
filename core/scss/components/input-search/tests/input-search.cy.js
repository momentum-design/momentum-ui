describe('@collab-ui/core', function() {
  it('snapshot of input-search', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/input-search`)
      .get('.cui-search-input')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

describe('@collab-ui/core', function() {
  it('snapshot of space-list', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/space-list`)
      .get('.cui-list-item--space')
      .should('be.visible')
      .percySnapshot();
  });
});

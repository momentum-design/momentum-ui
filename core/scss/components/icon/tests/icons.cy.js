describe('@collab-ui/core', function() {
  it('snapshot of icon', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/icon`)
      .get('.cui-icon')
      .should('be.visible')
      .percySnapshot();
  });
});

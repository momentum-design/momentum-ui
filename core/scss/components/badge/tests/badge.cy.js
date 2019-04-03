describe('@collab-ui/core', function() {
  it('snapshot of badge', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/badge`)
      .get('.cui-badge')
      .should('be.visible')
      .percySnapshot();
  });
});

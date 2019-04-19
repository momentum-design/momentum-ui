describe('@collab-ui/core', function() {
  it('snapshot of menu', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/menu`)
      .get('.cui-menu')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

describe('@collab-ui/core', function() {
  it('snapshot of colors', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/colors`)
      .get('.paint-chip-group')
      .should('be.visible')
      .wait(500)
      .percySnapshot();
  });
});

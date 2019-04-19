describe('@collab-ui/core', function() {
  it('snapshot of input', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/input`)
      .get('.cui-input')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

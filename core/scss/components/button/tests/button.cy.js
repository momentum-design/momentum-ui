describe('@collab-ui/core', function() {
  it('snapshot of button', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/button`)
      .get('.cui-button')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

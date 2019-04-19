describe('@collab-ui/core', function() {
  it('snapshot of collapse button', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/collapse-button`)
      .get('.cui-collapse-button')
      .should('be.visible')
      .percySnapshot();
  });
});

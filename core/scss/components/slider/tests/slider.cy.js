describe('@collab-ui/core', function() {
  it('snapshot of slider', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/slider`)
      .get('.cui-slider')
      .should('be.visible')
      .percySnapshot();
  });
});

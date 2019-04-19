describe('@collab-ui/core', function() {
  it('snapshot of accordion', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/accordion`)
      .get('.cui-accordion')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

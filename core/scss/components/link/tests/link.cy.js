describe('@collab-ui/core', function() {
  it('snapshot of link', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/link`)
      .get('.cui-link')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

describe('@collab-ui/core', function() {
  it('snapshot of checkbox', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/checkbox`)
      .get('.cui-checkbox')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

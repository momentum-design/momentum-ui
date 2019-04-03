describe.skip('@collab-ui/core', function() {
  it('snapshot of meeting-list', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/meeting-list`)
      .get('.cui-meeting-list')
      .should('be.visible')
      .percySnapshot();
  });
});

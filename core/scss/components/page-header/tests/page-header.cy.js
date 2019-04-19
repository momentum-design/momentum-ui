
describe.skip('@collab-ui/core', function() {
  it('snapshot of page-header', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/page-header`)
      .get('.cui-page-heaaer')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

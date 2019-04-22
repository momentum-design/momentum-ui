
describe.skip('@momentum-ui/core', function() {
  it('snapshot of page-header', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/page-header`)
      .get('.md-page-heaaer')
      .should('be.visible')
      .percySnapshot();
  });
});

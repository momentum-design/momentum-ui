
describe('@collab-ui/core', function() {
  it('snapshot of page-header', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/page-header`);
    cy.percySnapshot()
  });
});

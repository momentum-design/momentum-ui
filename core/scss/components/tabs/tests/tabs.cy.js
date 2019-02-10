
describe('@collab-ui/core', function() {
  it('snapshot of tabs', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/tabs`);
    cy.percySnapshot()
  });
});

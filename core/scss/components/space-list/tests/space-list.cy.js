
describe('@collab-ui/core', function() {
  it('snapshot of space-list', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/space-list`);
    cy.percySnapshot()
  });
});

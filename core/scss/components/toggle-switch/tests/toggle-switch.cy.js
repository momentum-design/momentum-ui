
describe('@collab-ui/core', function() {
  it('snapshot of toggle-switch', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/toggle-switch`);
    cy.percySnapshot()
  });
});

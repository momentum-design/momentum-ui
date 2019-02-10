
describe('@collab-ui/core', function() {
  it('snapshot of menu', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/menu`);
    cy.percySnapshot()
  });
});

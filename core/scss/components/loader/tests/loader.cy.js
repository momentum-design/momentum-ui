
describe('@collab-ui/core', function() {
  it('snapshot of loader', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/loader`);
    cy.percySnapshot()
  });
});

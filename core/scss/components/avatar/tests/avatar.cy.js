
describe('@collab-ui/core', function() {
  it('snapshot of avatar', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/avatar`);
    cy.percySnapshot()
  });
});

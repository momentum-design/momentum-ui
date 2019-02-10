
describe('@collab-ui/core', function() {
  it('snapshot of alert', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/alert`);
    cy.percySnapshot()
  });
});

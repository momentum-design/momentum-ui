
describe('@collab-ui/core', function() {
  it('snapshot of pagination', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/pagination`);
    cy.percySnapshot()
  });
});


describe('@collab-ui/core', function() {
  it('snapshot of modal', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/modal`);
    cy.percySnapshot()
  });
});

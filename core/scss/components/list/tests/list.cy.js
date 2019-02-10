
describe('@collab-ui/core', function() {
  it('snapshot of list', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/list`);
    cy.percySnapshot()
  });
});

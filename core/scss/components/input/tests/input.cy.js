
describe('@collab-ui/core', function() {
  it('snapshot of input', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/input`);
    cy.percySnapshot()
  });
});

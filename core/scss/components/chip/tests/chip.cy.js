
describe('@collab-ui/core', function() {
  it('snapshot of chip', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/chip`);
    cy.percySnapshot()
  });
});

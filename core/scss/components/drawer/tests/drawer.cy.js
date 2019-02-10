
describe('@collab-ui/core', function() {
  it('snapshot of drawer', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/drawer`);
    cy.percySnapshot()
  });
});

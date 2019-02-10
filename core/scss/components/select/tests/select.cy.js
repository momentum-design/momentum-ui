
describe('@collab-ui/core', function() {
  it('snapshot of select', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/select`);
    cy.percySnapshot()
  });
});

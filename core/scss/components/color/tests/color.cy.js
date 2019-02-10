
describe('@collab-ui/core', function() {
  it('snapshot of color', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/color`);
    cy.percySnapshot()
  });
});

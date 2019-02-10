
describe('@collab-ui/core', function() {
  it('snapshot of breadcrumb', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/breadcrumb`);
    cy.percySnapshot()
  });
});

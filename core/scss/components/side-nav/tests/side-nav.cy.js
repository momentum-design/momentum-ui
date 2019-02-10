
describe('@collab-ui/core', function() {
  it('snapshot of side-nav', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/side-nav`);
    cy.percySnapshot()
  });
});

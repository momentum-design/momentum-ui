
describe('@collab-ui/core', function() {
  it('snapshot of combo-box', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/combo-box`);
    cy.percySnapshot()
  });
});

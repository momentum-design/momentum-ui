
describe('@collab-ui/core', function() {
  it('snapshot of popover', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/popover`);
    cy.percySnapshot()
  });
});

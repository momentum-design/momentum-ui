
describe('@collab-ui/core', function() {
  it('snapshot of meeting-list', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/meeting-list`);
    cy.percySnapshot()
  });
});

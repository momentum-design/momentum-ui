
describe('@collab-ui/core', function() {
  it('snapshot of alert-meeting', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/alert-meeting`);
    cy.percySnapshot()
  });
});

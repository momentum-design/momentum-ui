
describe('@collab-ui/core', function() {
  it('snapshot of alert-banner', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/alert-banner`);
    cy.percySnapshot()
  });
});

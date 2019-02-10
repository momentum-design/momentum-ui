
describe('@collab-ui/core', function() {
  it('snapshot of tooltips', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/tooltips`);
    cy.percySnapshot()
  });
});

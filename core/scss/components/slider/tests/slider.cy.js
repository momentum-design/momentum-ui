
describe('@collab-ui/core', function() {
  it('snapshot of slider', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/slider`);
    cy.percySnapshot()
  });
});

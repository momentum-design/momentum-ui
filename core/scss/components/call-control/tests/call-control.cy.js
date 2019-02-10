
describe('@collab-ui/core', function() {
  it('snapshot of call-control', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/call-control`);
    cy.percySnapshot()
  });
});

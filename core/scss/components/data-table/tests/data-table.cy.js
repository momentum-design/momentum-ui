
describe('@collab-ui/core', function() {
  it('snapshot of data-table', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/data-table`);
    cy.percySnapshot()
  });
});

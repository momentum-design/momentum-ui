
describe('@collab-ui/core', function() {
  it('snapshot of date-range-picker', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/date-range-picker`);
    cy.percySnapshot()
  });
});

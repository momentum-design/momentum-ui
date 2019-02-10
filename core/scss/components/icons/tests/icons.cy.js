
describe('@collab-ui/core', function() {
  it('snapshot of icons', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/icons`);
    cy.percySnapshot()
  });
});

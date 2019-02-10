
describe('@collab-ui/core', function() {
  it('snapshot of button', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/button`);
    cy.percySnapshot()
  });
});

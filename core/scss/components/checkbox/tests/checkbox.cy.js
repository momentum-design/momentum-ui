
describe('@collab-ui/core', function() {
  it('snapshot of checkbox', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/checkbox`);
    cy.percySnapshot()
  });
});


describe('@collab-ui/core', function() {
  it('snapshot of blog-list', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/blog-list`);
    cy.percySnapshot()
  });
});

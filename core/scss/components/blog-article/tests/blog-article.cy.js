
describe('@collab-ui/core', function() {
  it('snapshot of blog-article', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/blog-article`);
    cy.percySnapshot()
  });
});

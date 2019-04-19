describe('@collab-ui/core', function() {
  it.skip('snapshot of blog-list', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/blog-list`)
      .get('.cui-blog-list')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

describe('@collab-ui/core', function() {
  it.skip('snapshot of blog-article', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/blog-article`)
      .get('.cui-blog-article')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

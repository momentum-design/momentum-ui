describe('@momentum-ui/core', function() {
  it.skip('snapshot of blog-article', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/blog-article`)
      .get('.md-blog-article')
      .should('be.visible')
      .percySnapshot();
  });
});

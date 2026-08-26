describe('@momentum-ui/core', function() {
  it.skip('snapshot of blog-article', function() {
    cy.visit(`/blog-article`)
      .get('.md-blog-article')
      .should('be.visible')
      .percySnapshot();
  });
});

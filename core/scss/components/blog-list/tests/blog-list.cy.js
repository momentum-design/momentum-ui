describe('@momentum-ui/core', function() {
  it.skip('snapshot of blog-list', function() {
    cy.visit(`/blog-list`)
      .get('.md-blog-list')
      .should('be.visible')
      .percySnapshot();
  });
});

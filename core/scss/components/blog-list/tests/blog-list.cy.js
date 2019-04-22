describe('@momentum-ui/core', function() {
  it.skip('snapshot of blog-list', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/blog-list`)
      .get('.md-blog-list')
      .should('be.visible')
      .percySnapshot();
  });
});

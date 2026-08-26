describe('@momentum-ui/core', function() {
  it('snapshot of breadcrumbs', function() {
    cy.visit(`/breadcrumbs`)
      .get('.md-breadcrumbs')
      .should('be.visible')
      .percySnapshot();
  });
});

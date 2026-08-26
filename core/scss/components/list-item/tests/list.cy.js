describe('@momentum-ui/core', function() {
  it.skip('snapshot of list', function() {
    cy.visit(`/list`)
      .get('.md-list')
      .should('be.visible')
      .percySnapshot();
  });
});

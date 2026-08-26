describe('@momentum-ui/core', function() {
  it('snapshot of input-search', function() {
    cy.visit(`/input-search`)
      .get('.md-search-input')
      .should('be.visible')
      .percySnapshot();
  });
});

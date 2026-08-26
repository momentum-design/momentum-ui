describe('@momentum-ui/core', function() {
  it('snapshot of top-bar', function() {
    cy.visit(`/top-bar`)
      .get('.md-top-bar')
      .should('be.visible')
      .percySnapshot();
  });
});

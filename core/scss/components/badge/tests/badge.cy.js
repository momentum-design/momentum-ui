describe('@momentum-ui/core', function() {
  it('snapshot of badge', function() {
    cy.visit(`/badge`)
      .get('.md-badge')
      .should('be.visible')
      .percySnapshot();
  });
});

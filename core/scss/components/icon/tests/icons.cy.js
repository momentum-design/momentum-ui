describe('@momentum-ui/core', function() {
  it('snapshot of icon', function() {
    cy.visit(`/icon`)
      .get('.md-icon')
      .should('be.visible')
      .percySnapshot();
  });
});

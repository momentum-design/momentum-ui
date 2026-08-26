describe('@momentum-ui/core', function() {
  it('snapshot of space-list', function() {
    cy.visit(`/space-list`)
      .get('.md-list-item--space')
      .should('be.visible')
      .percySnapshot();
  });
});

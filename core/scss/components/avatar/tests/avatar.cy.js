describe('@momentum-ui/core', function() {
  it('snapshot of avatar', function() {
    cy.visit(`/avatar`)
      .get('.md-avatar')
      .should('be.visible')
      .percySnapshot();
  });
});

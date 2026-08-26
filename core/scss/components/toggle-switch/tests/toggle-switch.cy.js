describe('@momentum-ui/core', function() {
  it('snapshot of toggle-switch', function() {
    cy.visit(`/toggle-switch`)
      .get('.md-toggle-switch')
      .should('be.visible')
      .percySnapshot();
  });
});

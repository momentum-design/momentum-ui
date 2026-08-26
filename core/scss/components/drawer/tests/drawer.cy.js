describe('@momentum-ui/core', function() {
  it.skip('snapshot of drawer', function() {
    cy.visit(`/drawer`)
      .get('.md-drawer')
      .should('be.visible')
      .percySnapshot();
  });
});

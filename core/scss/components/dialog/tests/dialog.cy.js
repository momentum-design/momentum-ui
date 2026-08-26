describe('@momentum-ui/core', function() {
  it('snapshot of dialog', function() {
    cy.visit(`/dialog`)
      .get('.md-modal--dialog')
      .should('be.visible')
      .percySnapshot();
  });
});

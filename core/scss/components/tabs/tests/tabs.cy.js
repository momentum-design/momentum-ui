describe('@momentum-ui/core', function() {
  it('snapshot of tabs', function() {
    cy.visit(`/tabs`)
      .get('.md-tab')
      .should('be.visible')
      .percySnapshot();
  });
});

describe('@momentum-ui/core', function() {
  it('snapshot of menu', function() {
    cy.visit(`/menu`)
      .get('.md-menu')
      .should('be.visible')
      .percySnapshot();
  });
});

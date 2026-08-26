describe('@momentum-ui/core', function() {
  it('snapshot of layout-grid', function() {
    cy.visit(`/layout-grid`)
      .get('.show-grid')
      .should('be.visible')
      .percySnapshot();
  });
});

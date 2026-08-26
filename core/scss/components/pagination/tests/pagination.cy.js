describe('@momentum-ui/core', function() {
  it('snapshot of pagination', function() {
    cy.visit(`/pagination`)
      .get('.pagination')
      .should('be.visible')
      .percySnapshot();
  });
});

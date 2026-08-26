describe('@momentum-ui/core', function() {
  it.skip('snapshot of chip', function() {
    cy.visit(`/chip`)
      .get('.md-accordion')
      .should('be.visible')
      .percySnapshot();
  });
});

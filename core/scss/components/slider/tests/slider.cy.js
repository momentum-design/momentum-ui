describe('@momentum-ui/core', function() {
  it('snapshot of slider', function() {
    cy.visit(`/slider`)
      .get('.md-slider')
      .should('be.visible')
      .percySnapshot();
  });
});

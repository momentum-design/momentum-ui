describe('@momentum-ui/core', function() {
  it('snapshot of accordion', function() {
    cy.visit(`/accordion`)
      .get('.md-accordion')
      .should('be.visible')
      .percySnapshot();
  });
});

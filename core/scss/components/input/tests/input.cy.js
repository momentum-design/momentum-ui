describe('@momentum-ui/core', function() {
  it('snapshot of input', function() {
    cy.visit(`/input`)
      .get('.md-input')
      .should('be.visible')
      .percySnapshot();
  });
});

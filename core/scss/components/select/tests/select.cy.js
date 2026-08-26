describe('@momentum-ui/core', function() {
  it('snapshot of select', function() {
    cy.visit(`/select`)
      .get('.md-select')
      .should('be.visible')
      .percySnapshot();
  });
});

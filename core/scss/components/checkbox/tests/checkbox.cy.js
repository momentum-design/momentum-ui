describe('@momentum-ui/core', function() {
  it('snapshot of checkbox', function() {
    cy.visit(`/checkbox`)
      .get('.md-checkbox')
      .should('be.visible')
      .percySnapshot();
  });
});

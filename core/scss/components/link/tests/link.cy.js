describe('@momentum-ui/core', function() {
  it('snapshot of link', function() {
    cy.visit(`/link`)
      .get('.md-link')
      .should('be.visible')
      .percySnapshot();
  });
});

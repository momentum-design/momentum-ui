describe('@momentum-ui/core', function() {
  it('snapshot of loader', function() {
    cy.visit(`/loader`)
      .get('.md-spinner-progress')
      .should('be.visible')
      .percySnapshot();
  });
});

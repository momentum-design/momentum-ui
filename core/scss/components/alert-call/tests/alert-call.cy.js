describe('@momentum-ui/core', function() {
  it('snapshot of alert-call', function() {
    cy.visit(`/alert-call`)
      .get('.md-alert--call')
      .should('be.visible')
      .percySnapshot();
  });
});

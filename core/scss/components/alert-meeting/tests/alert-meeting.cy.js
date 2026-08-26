describe('@momentum-ui/core', function() {
  it('snapshot of alert-meeting', function() {
    cy.visit(`/alert-meeting`)
      .get('.md-alert--meeting')
      .should('be.visible')
      .percySnapshot();
  });
});

describe('@momentum-ui/core', function() {
  it('snapshot of alert', function() {
    cy.visit(`/alert`)
      .get('.md-alert')
      .should('be.visible')
      .percySnapshot();
  });
});

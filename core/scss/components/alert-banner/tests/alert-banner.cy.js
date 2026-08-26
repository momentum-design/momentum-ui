describe('@momentum-ui/core', function() {
  it('snapshot of alert-banner', function() {
    cy.visit(`/alert-banner`)
      .get('.md-alert-banner')
      .should('be.visible')
      .percySnapshot();
  });
});

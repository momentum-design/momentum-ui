describe.skip('@momentum-ui/core', function() {
  it('snapshot of meeting-list', function() {
    cy.visit(`/meeting-list`)
      .get('.md-meeting-list')
      .should('be.visible')
      .percySnapshot();
  });
});

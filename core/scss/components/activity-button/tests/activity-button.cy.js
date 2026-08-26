describe('@momentum-ui/core', function() {
  it('snapshot of activity-button', function() {
    cy.visit(`/activity-button`)
      .get('.md-button__container--small')
      .should('be.visible')
      .percySnapshot();
  });
});

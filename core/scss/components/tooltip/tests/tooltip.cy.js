describe('@momentum-ui/core', function() {
  it('snapshot of tooltip', function() {
    cy.visit(`/tooltip`)
      .get('.md-tooltip .md-event-overlay__children')
      .should('be.visible')
      .percySnapshot();
  });
});

describe('@momentum-ui/core', function() {
  it('snapshot of button-group', function() {
    cy.visit(`/button-group`)
      .get('.md-button-group')
      .should('be.visible')
      .percySnapshot();
  });
});

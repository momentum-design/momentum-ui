describe('@momentum-ui/core', function() {
  it('snapshot of combo-box', function() {
    cy.visit(`/combo-box`)
      .get('.md-combo-box .md-input-container')
      .should('be.visible')
      .percySnapshot();
  });
});

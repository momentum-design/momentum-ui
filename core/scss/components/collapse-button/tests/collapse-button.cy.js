describe('@momentum-ui/core', function() {
  it('snapshot of collapse button', function() {
    cy.visit(`/collapse-button`)
      .get('.md-collapse-button')
      .should('be.visible')
      .percySnapshot();
  });
});

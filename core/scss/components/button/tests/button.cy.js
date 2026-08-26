describe('@momentum-ui/core', function() {
  it('snapshot of button', function() {
    cy.visit(`/button`)
      .get('.md-button')
      .should('be.visible')
      .percySnapshot();
  });
});

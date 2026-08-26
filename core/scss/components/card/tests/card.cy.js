describe('@momentum-ui/core', function() {
  it('snapshot of card', function() {
    cy.visit(`/card`)
      .get('.md-card')
      .should('be.visible')
      .percySnapshot();
  });
});

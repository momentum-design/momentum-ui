describe('@momentum-ui/core', function() {
  it('snapshot of colors', function() {
    cy.visit(`/colors`)
      .get('.paint-chip-group')
      .should('be.visible')
      .percySnapshot();
  });
});

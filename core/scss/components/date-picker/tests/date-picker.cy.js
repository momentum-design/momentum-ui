describe('@momentum-ui/core', function() {
  it('snapshot of date-picker', function() {
    cy.visit(`/date-picker`)
      .get('.md-date-picker')
      .should('be.visible')
      .percySnapshot();
  });
});

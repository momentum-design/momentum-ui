describe('@momentum-ui/core', function() {
  it('snapshot of progress', function() {
    cy.visit(`/progress`)
      .get('.progressbar-info')
      .should('be.visible')
      .percySnapshot();
  });
});

describe('@momentum-ui/core', function() {
  it.skip('snapshot of call-control', function() {
    cy.visit(`/call-control`)
      .get('.md-call-control')
      .should('be.visible')
      .percySnapshot();
  });
});

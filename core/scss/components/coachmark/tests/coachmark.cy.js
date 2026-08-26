describe('@momentum-ui/core', function() {
  it('snapshot of coachmark', function() {
    cy.visit(`/coachmark`)
      .get('.md-coachmark__container')
      .should('be.visible')
      .percySnapshot();
  });
});

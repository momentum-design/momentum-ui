describe('@momentum-ui/core', function() {
  it('snapshot of modal', function() {
    cy.visit(`/modal`)
      .get('.md-modal')
      .should('be.visible')
      .percySnapshot();
  });
});

describe('@momentum-ui/core', function() {
  it('snapshot of lightbox', function() {
    cy.visit(`/lightbox`)
      .get('.md-lightbox')
      .should('be.visible')
      .percySnapshot();
  });
});

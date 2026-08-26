describe('@momentum-ui/core', function() {
  it('snapshot of typography', function() {
    cy.visit(`/typography`)
      .get('.title-heading')
      .should('be.visible')
      .percySnapshot();
  });
});

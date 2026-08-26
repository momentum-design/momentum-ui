describe('@momentum-ui/core', function() {
  it('snapshot of social-list', function() {
    cy.visit(`/social-list`)
      .get('.md-social__list .md-list')
      .should('be.visible')
      .percySnapshot();
  });
});

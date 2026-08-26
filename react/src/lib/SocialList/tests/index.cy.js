describe('@momentum-ui/react', () => {
  it('snapshot of social-list', () => {
    cy.visit(`/social-list`)
      .get(`.social-list`)
      .should('be.visible')
      .percySnapshot();
  });
});

describe('@momentum-ui/react', () => {
  it('snapshot of progress-bar', () => {
    cy.visit(`/progress-bar`)
      .get(`.progress`)
      .should('be.visible')
      .percySnapshot();
  });
});

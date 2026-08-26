describe('@momentum-ui/react', () => {
  it('snapshot of form-sub-section', () => {
    cy.visit(`/form-sub-section`)
      .get(`.sub-section`)
      .should('be.visible')
      .percySnapshot();
  });
});

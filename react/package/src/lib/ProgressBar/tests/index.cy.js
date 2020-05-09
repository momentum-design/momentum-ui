describe('@momentum-ui/react', () => {
  it('snapshot of progress-bar', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/progress-bar`)
      .get(`.progress`)
      .should('be.visible')
      .percySnapshot();
  });
});

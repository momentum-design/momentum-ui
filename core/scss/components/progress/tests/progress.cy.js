describe('@momentum-ui/core', function() {
  it('snapshot of progress', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/progress`)
      .get('.progressbar-info')
      .should('be.visible')
      .percySnapshot();
  });
});

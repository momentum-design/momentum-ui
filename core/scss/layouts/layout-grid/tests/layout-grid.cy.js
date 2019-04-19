describe('@collab-ui/core', function() {
  it('snapshot of layout-grid', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/layout-grid`)
      .get('.show-grid')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

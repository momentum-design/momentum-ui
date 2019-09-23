describe('@momentum-ui/angularjs', function() {
  it('snapshot of toggle switch', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/#/kitchen-sink/toggle-switch`)
      .get('#toggleReadonlyChecked1')
      .should('be.visible')
      .percySnapshot();
  });
});

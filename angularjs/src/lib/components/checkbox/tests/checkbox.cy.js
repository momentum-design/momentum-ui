describe('@momentum-ui/angularjs', function() {
  it('snapshot of checkbox', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/#/kitchen-sink/checkbox`)
    .get('#checkboxGroup44')
    .should('be.visible')
    .percySnapshot();
  });
});

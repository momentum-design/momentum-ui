describe('@momentum-ui/angularjs', function() {
  it('snapshot of radio', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/#/kitchen-sink/radio`)
    .get('#radioNestedHelp34')
    .should('be.visible')
    .percySnapshot();
  });
});

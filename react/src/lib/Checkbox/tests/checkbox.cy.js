describe('@momentum-ui/react', function() {
  it('snapshot of checkbox', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/checkbox`)
      .get('#checkboxNestedHelp34')
      .should('be.visible')
      .percySnapshot();
  });
});

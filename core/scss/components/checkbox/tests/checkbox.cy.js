describe('@momentum-ui/core', function() {
  it('snapshot of checkbox', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/checkbox`)
      .get('.md-checkbox')
      .should('be.visible')
      .percySnapshot();
  });
});

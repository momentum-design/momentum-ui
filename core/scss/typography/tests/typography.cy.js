describe('@momentum-ui/core', function() {
  it('snapshot of typography', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/typography`)
      .get('.title-heading')
      .should('be.visible')
      .percySnapshot();
  });
});

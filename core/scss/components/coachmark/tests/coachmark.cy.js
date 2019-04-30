describe('@momentum-ui/core', function() {
  it('snapshot of coachmark', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/coachmark`)
      .get('.md-coachmark__container')
      .should('be.visible')
      .percySnapshot();
  });
});

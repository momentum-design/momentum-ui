describe('@momentum-ui/core', function() {
  it('snapshot of breadcrumbs', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/breadcrumbs`)
      .get('.md-breadcrumbs')
      .should('be.visible')
      .percySnapshot();
  });
});

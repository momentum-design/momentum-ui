describe('@collab-ui/core', function() {
  it('snapshot of breadcrumbs', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/breadcrumbs`)
      .get('.cui-breadcrumbs')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

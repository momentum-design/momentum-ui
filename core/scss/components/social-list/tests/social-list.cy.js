describe('@collab-ui/core', function() {
  it('snapshot of social-list', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/social-list`)
      .get('.cui-social__list .cui-list')
      .should('be.visible')
      .wait(1000)
      .percySnapshot();
  });
});

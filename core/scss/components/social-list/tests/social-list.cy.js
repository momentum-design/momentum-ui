describe('@momentum-ui/core', function() {
  it('snapshot of social-list', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/social-list`)
      .get('.md-social__list .md-list')
      .should('be.visible')
      .percySnapshot();
  });
});

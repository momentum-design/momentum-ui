
describe('@momentum-ui/core', function() {
  it('snapshot of sidebar', function() {
    cy
      .visit(`${Cypress.env('BASE_URL')}/sidebar`)
      .get('.md-sidebar')
      .should('be.visible')
      .percySnapshot();
  });
});

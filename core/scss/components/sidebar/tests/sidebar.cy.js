
describe('@collab-ui/core', function() {
  it('snapshot of sidebar', function() {
    cy
      .visit(`${Cypress.env('BASE_URL')}/sidebar`)
      .get('.cui-sidebar')
      .should('be.visible')
      .percySnapshot();
  });
});

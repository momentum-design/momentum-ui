
describe('@momentum-ui/core', function() {
  it('snapshot of sidebar', function() {
    cy
      .visit(`/sidebar`)
      .get('.md-sidebar')
      .should('be.visible')
      .percySnapshot();
  });
});

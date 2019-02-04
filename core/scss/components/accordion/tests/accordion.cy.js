describe('@collab-ui/core', function() {
  it('tests the accordion', function() {
    cy.visit('http://localhost:4200/accordion');
    cy.percySnapshot()
  });
});

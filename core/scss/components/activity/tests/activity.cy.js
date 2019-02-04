describe('@collab-ui/core', function() {
  it('tests the activity buttons', function() {
    cy.visit('http://localhost:4200/activity-button');
    cy.percySnapshot()
  });
});

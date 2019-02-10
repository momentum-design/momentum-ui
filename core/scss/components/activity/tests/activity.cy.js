describe('@collab-ui/core', function() {
  it('snapshot of Activity Buttons', function() {
    cy.visit('http://localhost:4200/activity-button');
    cy.percySnapshot()
  });
});

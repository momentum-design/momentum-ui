
describe('@collab-ui/core', function() {
  it('snapshot of editable-textfield', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/editable-textfield`);
    cy.percySnapshot()
  });
});

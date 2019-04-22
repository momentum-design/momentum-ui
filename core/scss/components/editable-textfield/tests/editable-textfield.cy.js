describe('@momentum-ui/core', function() {
  it('snapshot of editable-textfield', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/editable-textfield`)
      .get('.md-editable-textfield__button')
      .should('be.visible')
      .percySnapshot();
  });
});

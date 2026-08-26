describe('@momentum-ui/core', function() {
  it('snapshot of editable-textfield', function() {
    cy.visit(`/editable-textfield`)
      .get('.md-editable-textfield__button')
      .should('be.visible')
      .percySnapshot();
  });
});

describe('@momentum-ui/core', function() {
  it('snapshot of lightbox', function() {
    cy.visit(`${Cypress.env('BASE_URL')}/lightbox`)
      .get('.md-lightbox')
      .should('be.visible')
      .percySnapshot();
  });
});

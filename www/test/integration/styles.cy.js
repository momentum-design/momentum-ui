describe('Styles pages', function() {
  describe('Test the styles pages', () => {
    it('Color should navigate to Color tokens page', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/tokens`)
        .get('.token-squares-container__item p')
        .contains('Color')
        .parents('.token-squares-container a')
        .click()
        .url()
        .should('include', 'tokens/color');
    });
    it('Typography should navigate to Typography tokens page', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/tokens`)
        .get('.token-squares-container__item p')
        .contains('Typography')
        .parents('.token-squares-container a')
        .click()
        .url()
        .should('include', 'tokens/typography');
    });
    it('Elevation should navigate to Elevation tokens page', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/tokens`)
        .get('.token-squares-container__item p')
        .contains('Elevation')
        .parents('.token-squares-container a')
        .click()
        .url()
        .should('include', 'tokens/elevation');
    });
    it('Space should navigate to the Space tokens page', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/tokens`)
        .get('.token-squares-container__item p')
        .contains('Space')
        .parents('.token-squares-container a')
        .click()
        .url()
        .should('include', 'tokens/space');
    });
  });
});

describe('Styles pages', function() {
  describe('Test the styles pages', () => {
    it('Learn more should navigate to Styles Color page', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/styles`)
        .get('.overview__title')
        .contains('Color')
        .siblings('.overview__link')
        .click()
        .url()
        .should('include', 'styles/color');
    });
    it('Learn more should navigate to Styles Design Tokens page', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/styles`)
        .get('.overview__title')
        .contains('Design Tokens')
        .siblings('.overview__link')
        .click()
        .url()
        .should('include', 'styles/design-tokens');
    });
    it('Learn more should navigate to Styles Icons page', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/styles`)
        .get('.overview__title')
        .contains('Icons')
        .siblings('.overview__link')
        .click()
        .url()
        .should('include', 'styles/icons');
    });
    it('Learn more should navigate to Styles Illustrations page', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/styles`)
        .get('.overview__title')
        .contains('Illustrations')
        .siblings('.overview__link')
        .click()
        .url()
        .should('include', 'styles/illustrations');
    });
    it('Learn more should navigate to Styles Motion page', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/styles`)
        .get('.overview__title')
        .contains('Motion')
        .siblings('.overview__link')
        .click()
        .url()
        .should('include', 'styles/motion');
    });
    it('Learn more should navigate to Styles Typography page', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/styles`)
        .get('.overview__title')
        .contains('Typography')
        .siblings('.overview__link')
        .click()
        .url()
        .should('include', 'styles/typography');
    });
  });
});

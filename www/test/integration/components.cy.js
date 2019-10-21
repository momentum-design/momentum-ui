describe('Components pages', function() {
  describe('Test the components overview page', () => {
    it('Search filter should filter the Avatar card', () => {
      cy.visit(`${Cypress.env('BASE_URL')}/components`)
        .get('#filterSearchInput')
        .type('avatar');
      cy.get('.docs-component-item--info__title')
        .contains('Avatars')
        .click()
        .url()
        .should('include', 'components/avatar');
    });
  });
  describe('Test the Code tab', () => {
    beforeEach(() => {
      cy.visit(`${Cypress.env('BASE_URL')}/components/avatar`);
    });
    it('Code tab should be active by default', () => {
      cy.get('[data-cy=code]').should('have.class', 'active');
    });
    it('Should have a default example', () => {
      cy.get('#default').should('exist');
    });
    it('Should default to core example', () => {
      cy.get('#default')
        .children('.code-block-container')
        .get('[aria-label=Core]')
        .should('have.class', 'active')
        .get('pre')
        .should('have.class', 'language-html');
    });
    it('Clicking React should change code examples to React', () => {
      cy.get('#default')
        .children('.code-block-container')
        .children('.md-button-group')
        .children('[aria-label=React]')
        .click()
        .should('have.class', 'active')
        .get('pre')
        .should('have.class', 'language-jsx');
    });
    it('Clicking Angular should change code examples to Angular', () => {
      cy.get('#default')
        .children('.code-block-container')
        .children('.md-button-group')
        .children('[aria-label=Angular]')
        .click()
        .should('have.class', 'active')
        .get('pre')
        .should('have.class', 'language-ts');
    });
    it('Clicking Show more should expand code example', () => {
      cy.get('#default')
        .children('.code-block-container')
        .children('.md-collapse__button')
        .click()
        .children()
        .should('contain', 'Show less')
        .get('pre')
        .should('have.class', 'language-ts');
      cy.get('#default')
        .children('.code-block-container')
        .children('.md-collapse__container')
        .should('have.class', 'md-collapse--expanded');
    });
  });
  describe('Test the Usage and Style tabs', () => {
    beforeEach(() => {
      cy.visit(`${Cypress.env('BASE_URL')}/components/avatar`);
    });
    it('Should navigate to the usage tab', () => {
      cy.get('[data-cy=usage]')
        .click()
        .url()
        .should('include', 'usage');
      cy.get('[data-cy=usage]').should('have.class', 'active');
    });
    it('Should navigate to the style tab', () => {
      cy.get('[data-cy=style]')
        .click()
        .url()
        .should('include', 'style');
      cy.get('[data-cy=style]').should('have.class', 'active');
    });
  });
});

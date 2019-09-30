import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  before(() => {
    cy.visit(`${Cypress.env('BASE_URL')}/popover`);
  });

  afterEach(() => {
    cy
      .get('body')
      .click()
      .end();
  });

  it('snapshot of arrow popover', () => {
      cy.get('#arrow')
        .focus()
        .get(`.${prefix}-event-overlay`)
        .should('exist')
        .percySnapshot()
        .end();
  });

  it('snapshot of contained', () => {
    cy.get('#contained')
      .click()
      .get(`.${prefix}-event-overlay`)
      .should('exist')
      .percySnapshot()
      .end();
  });

  it('snapshot of default click popover', () => {
    cy.get('#default-1')
      .click()
      .get(`.${prefix}-event-overlay`)
      .should('exist')
      .percySnapshot()
      .end();
  });

  it('snapshot of default mouseenter popover', () => {
    cy.get('#default-2')
      .focus()
      .get(`.${prefix}-event-overlay`)
      .should('exist')
      .percySnapshot()
      .end();
  });

  it('snapshot of default focus popover', () => {
    cy.get('#default-3')
      .focus()
      .get(`.${prefix}-event-overlay`)
      .should('exist')
      .percySnapshot()
      .end();
  });

  it('snapshot of direction popover', () => {
    cy.get('#direction')
        .focus()
        .get(`.${prefix}-event-overlay`)
        .should('exist')
        .percySnapshot()
        .end();
  });

  it('snapshot of offset popover', () => {
      cy.get('#offset')
        .focus()
        .get(`.${prefix}-event-overlay`)
        .should('exist')
        .percySnapshot()
        .end();
  });

  it('snapshot of overflow popover', () => {
    cy.get('#overflow')
      .click()
      .get(`.${prefix}-event-overlay`)
      .should('exist')
      .percySnapshot()
      .end();
  });
});

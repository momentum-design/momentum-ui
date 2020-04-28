import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  before(() => {
    cy.visit(`${Cypress.env('BASE_URL')}/tooltip`);
  });

  afterEach(() => {
    cy
      .get('body')
      .click()
      .end();
  });

  it('snapshot of content tooltip', () => {
      cy.get('#content')
        .click()
        .get(`.${prefix}-tooltip`)
        .should('exist')
        .percySnapshot()
        .end();
  });

  it('snapshot of default click tooltip', () => {
    cy.get('#default-1')
      .click()
      .get(`.${prefix}-tooltip`)
      .should('exist')
      .percySnapshot()
      .end();
  });

  it('snapshot of default mouseenter tooltip', () => {
    cy.get('#default-2')
      .focus()
      .get(`.${prefix}-tooltip`)
      .should('exist')
      .percySnapshot()
      .end();
  });

  it('snapshot of default focus tooltip', () => {
    cy.get('#default-3')
      .focus()
      .get(`.${prefix}-tooltip`)
      .should('exist')
      .percySnapshot()
      .end();
  });

  it('snapshot of delay tooltip', () => {
    cy.get('#delay')
      .click()
      .get(`.${prefix}-tooltip`)
      .should('exist')
      .percySnapshot()
      .end();
  });

  it('snapshot of direction tooltip', () => {
    cy.get('#direction')
        .click()
        .get(`.${prefix}-tooltip`)
        .should('exist')
        .percySnapshot()
        .end();
  });
});

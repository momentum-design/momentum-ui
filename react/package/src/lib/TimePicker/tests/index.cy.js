import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  before(() => {
    cy.visit(`${Cypress.env('BASE_URL')}/time-picker`);
  });

  afterEach(() => {
    cy
      .get('body')
      .click()
      .end();
  });

  it('snapshot of 24 hr time-picker', () => {
    cy.get('#24hour')
      .click({force: true})
      .get(`.${prefix}-timepicker-container`)
      .should('exist')
      .percySnapshot()
      .end();
  });

  it('snapshot of 30 min time-picker', () => {
    cy.get('#30min')
      .click({force: true})
      .get(`.${prefix}-timepicker-container`)
      .should('exist')
      .percySnapshot()
      .end();
  });

  it('snapshot of default time-picker', () => {
    cy.get('#default')
      .click({force: true})
      .get(`.${prefix}-timepicker-container`)
      .should('exist')
      .percySnapshot()
      .end();
  });
});

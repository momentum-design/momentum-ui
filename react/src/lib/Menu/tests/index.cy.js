import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  before(() => {
    cy.visit(`${Cypress.env('BASE_URL')}/menu`);
  });

  afterEach(() => {
    cy
      .get('body')
      .click()
      .end();
  });

  it('snapshot of custom menu', () => {
      cy.get('#custom')
        .click()
        .get(`.${prefix}-menu`)
        .should('exist')
        .percySnapshot()
        .end();
  });

  it('snapshot of default menu', () => {
    cy.get('#default')
      .click()
      .get(`.${prefix}-menu`)
      .should('exist')
      .percySnapshot()
      .end();
  });

  it('snapshot of submenu menu', () => {
    cy.get('#submenu')
      .click()
      .get(`.${prefix}-menu`)
      .should('exist')
      .percySnapshot()
      .get(`.${prefix}-menu`)
      .click()
      .percySnapshot()
      .end();
  });
});

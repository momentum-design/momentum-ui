import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of dialog', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/dialog`)
      .get('#default-1')
      .click()
      .get(`.${prefix}-modal--dialog`)
      .should('be.visible')
      .percySnapshot()
      .trigger('keydown', { which: 27, code: 'Escape', key: 'Escape' })
      .get('#default-2')
      .click()
      .get(`.${prefix}-modal--dialog`)
      .should('be.visible')
      .percySnapshot();
  });
});

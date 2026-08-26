import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of dialog', () => {
    cy.visit(`/dialog`)
      .get('#default-1')
      .click()
      .get(`.${prefix}-modal--dialog`)
      .should('be.visible')
      .percySnapshot();
    cy.get(`.${prefix}-modal--dialog`)
      .trigger('keydown', { which: 27, code: 'Escape', key: 'Escape' });
    cy.get('#default-2')
      .click()
      .get(`.${prefix}-modal--dialog`)
      .should('be.visible')
      .percySnapshot();
  });
});

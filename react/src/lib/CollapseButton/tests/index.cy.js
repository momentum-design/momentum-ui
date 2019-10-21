import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of collapse button', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/collapse-button`)
      .get(`.${prefix}-collapse-button`)
      .should('be.visible')
      .percySnapshot();
  });
});

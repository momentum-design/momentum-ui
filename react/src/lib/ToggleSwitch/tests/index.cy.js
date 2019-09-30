import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of toggle-switch', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/toggle-switch`)
      .get(`.${prefix}-toggle-switch`)
      .should('be.visible')
      .percySnapshot();
  });
});

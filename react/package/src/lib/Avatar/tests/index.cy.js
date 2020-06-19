import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of avatar', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/avatar`)
      .get(`.${prefix}-avatar`)
      .should('be.visible')
      .percySnapshot();
  });
});

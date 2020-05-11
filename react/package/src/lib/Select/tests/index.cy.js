import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of select', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/select`)
      .get(`.${prefix}-select`)
      .should('be.visible')
      .percySnapshot();
  });
});

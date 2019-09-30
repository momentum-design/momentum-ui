import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of list-item-header', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/list-item-header`)
      .get(`.${prefix}-list-item-header`)
      .should('be.visible')
      .percySnapshot();
  });
});

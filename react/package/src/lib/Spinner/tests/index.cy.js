import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of spinner', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/spinner`)
      .get(`.${prefix}-spinner`)
      .should('be.visible')
      .percySnapshot();
  });
});

import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of input-search', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/input-search`)
      .get(`.${prefix}-input`)
      .should('be.visible')
      .percySnapshot();
  });
});

import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of input', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/input`)
      .get(`.${prefix}-input`)
      .should('be.visible')
      .percySnapshot();
  });
});

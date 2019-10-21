import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of radio', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/radio`)
      .get(`.${prefix}-radio`)
      .should('be.visible')
      .percySnapshot();
  });
});

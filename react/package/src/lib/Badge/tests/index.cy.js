import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of badge', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/badge`)
      .get(`.${prefix}-badge`)
      .should('be.visible')
      .percySnapshot();
  });
});

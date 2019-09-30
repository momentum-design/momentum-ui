import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of loading', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/loading`)
      .get(`.${prefix}-loading`)
      .should('be.visible')
      .percySnapshot();
  });
});

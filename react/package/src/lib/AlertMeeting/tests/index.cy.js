import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of alert meeting', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/alert-meeting`)
      .get(`.${prefix}-alert--meeting`)
      .should('be.visible')
      .percySnapshot();
  });
});

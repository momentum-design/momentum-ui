import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of activity button', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/activity-button`)
      .get(`.${prefix}-activity`)
      .should('be.visible')
      .percySnapshot();
  });
});

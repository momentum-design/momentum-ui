import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of button', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/button`)
      .get(`.${prefix}-button`)
      .should('be.visible')
      .percySnapshot();
  });
});

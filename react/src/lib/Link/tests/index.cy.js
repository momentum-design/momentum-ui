import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of link', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/link`)
      .get(`.${prefix}-link`)
      .should('be.visible')
      .percySnapshot();
  });
});

import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of checkbox', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/checkbox`)
      .get(`.${prefix}-checkbox`)
      .should('be.visible')
      .percySnapshot();
  });
});

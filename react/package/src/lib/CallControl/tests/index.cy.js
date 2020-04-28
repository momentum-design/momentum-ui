import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of call control', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/call-control`)
      .get(`.${prefix}-call-control`)
      .should('be.visible')
      .percySnapshot();
  });
});

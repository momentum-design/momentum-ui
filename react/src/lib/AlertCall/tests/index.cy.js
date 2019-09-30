import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of alert call', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/alert-call`)
      .get(`.${prefix}-alert--call`)
      .should('be.visible')
      .percySnapshot();
  });
});

import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  before(() => {
    cy.visit(`${Cypress.env('BASE_URL')}/coachmark`);
    cy.viewport(1001, 661);
  });

  it('snapshot of coachmark', () => {
    cy
    .get(`.${prefix}-coachmark__container`)
    .should('be.visible')
    .percySnapshot();
  });
});

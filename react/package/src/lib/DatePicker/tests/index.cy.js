import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  before(() => {
    cy.visit(`${Cypress.env('BASE_URL')}/date-picker`);
    cy.viewport(1001, 661);
  });


  it('snapshot of date picker', () => {
    cy.get('#default-1')
      .click()
      .get(`.${prefix}-datepicker-container`)
      .should('be.visible')
      .percySnapshot();
  });
});

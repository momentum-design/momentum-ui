import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of form section', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/form-section`)
      .get(`.${prefix}-form__section`)
      .should('be.visible')
      .percySnapshot();
  });
});

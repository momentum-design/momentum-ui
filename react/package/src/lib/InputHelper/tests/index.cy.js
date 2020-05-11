import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of input-helper', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/input-helper`)
      .get(`.${prefix}-input__help-text`)
      .should('be.visible')
      .percySnapshot();
  });
});

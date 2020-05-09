import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of modal-footer', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/modal-footer`)
      .get(`.${prefix}-modal__footer`)
      .should('be.visible')
      .percySnapshot();
  });
});

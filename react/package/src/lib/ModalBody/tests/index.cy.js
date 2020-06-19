import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of modal-body', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/modal-body`)
      .get(`.${prefix}-modal__body`)
      .should('be.visible')
      .percySnapshot();
  });
});

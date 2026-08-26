import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of modal-footer', () => {
    cy.visit(`/modal-footer`)
      .get(`.${prefix}-modal__footer`)
      .should('be.visible')
      .percySnapshot();
  });
});

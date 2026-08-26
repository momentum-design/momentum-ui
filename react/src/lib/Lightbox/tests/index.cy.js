import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of lightbox', () => {
    cy.visit(`/lightbox`)
      .get(`.${prefix}-lightbox`)
      .should('be.visible')
      .percySnapshot();
  });
});

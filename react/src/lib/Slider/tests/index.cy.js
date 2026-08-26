import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of slider', () => {
    cy.visit(`/slider`)
      .get(`.${prefix}-slider`)
      .should('be.visible')
      .percySnapshot();
  });
});

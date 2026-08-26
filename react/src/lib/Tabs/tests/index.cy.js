import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of tabs', () => {
    cy.visit(`/tabs`)
      .get(`.${prefix}-tab`)
      .should('be.visible')
      .percySnapshot();
  });
});

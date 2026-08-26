import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of badge', () => {
    cy.visit(`/badge`)
      .get(`.${prefix}-badge`)
      .should('be.visible')
      .percySnapshot();
  });
});

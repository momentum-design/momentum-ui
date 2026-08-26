import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of toggle-switch', () => {
    cy.visit(`/toggle-switch`)
      .get(`.${prefix}-toggle-switch`)
      .should('be.visible')
      .percySnapshot();
  });
});

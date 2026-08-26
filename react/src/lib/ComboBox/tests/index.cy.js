import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of combo box', () => {
    cy.visit(`/combo-box`)
      .get(`.${prefix}-combo-box`)
      .should('be.visible')
      .percySnapshot();
  });
});

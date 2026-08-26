import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of label', () => {
    cy.visit(`/label`)
      .get(`.${prefix}-label`)
      .should('be.visible')
      .percySnapshot();
  });
});

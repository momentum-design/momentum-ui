import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of spinner', () => {
    cy.visit(`/spinner`)
      .get(`.${prefix}-spinner`)
      .should('be.visible')
      .percySnapshot();
  });
});

import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of avatar', () => {
    cy.visit(`/avatar`)
      .get(`.${prefix}-avatar`)
      .should('be.visible')
      .percySnapshot();
  });
});

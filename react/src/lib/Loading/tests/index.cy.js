import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of loading', () => {
    cy.visit(`/loading`)
      .get(`.${prefix}-loading`)
      .should('be.visible')
      .percySnapshot();
  });
});

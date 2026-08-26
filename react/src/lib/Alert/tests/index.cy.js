import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of alert', () => {
    cy.visit(`/alert`)
      .get(`.${prefix}-alert`)
      .should('be.visible')
      .percySnapshot();
  });
});

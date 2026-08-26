import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of alert meeting', () => {
    cy.visit(`/alert-meeting`)
      .get(`.${prefix}-alert--meeting`)
      .should('be.visible')
      .percySnapshot();
  });
});

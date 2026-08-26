import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of alert banner', () => {
    cy.visit(`/alert-banner`)
      .get(`.${prefix}-alert-banner`)
      .should('be.visible')
      .percySnapshot();
  });
});

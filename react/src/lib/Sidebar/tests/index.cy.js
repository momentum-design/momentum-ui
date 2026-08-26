import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of sidebar', () => {
    cy.visit(`/sidebar`)
      .get(`.${prefix}-sidebar`)
      .should('be.visible')
      .percySnapshot();
  });
});

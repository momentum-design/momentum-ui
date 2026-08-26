import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of list', () => {
    cy.visit(`/list`)
      .get(`.${prefix}-list`)
      .should('be.visible')
      .percySnapshot();
  });
});

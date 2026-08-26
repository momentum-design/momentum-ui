import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of list-item', () => {
    cy.visit(`/list-item`)
      .get(`.${prefix}-list-item`)
      .should('be.visible')
      .percySnapshot();
  });
});

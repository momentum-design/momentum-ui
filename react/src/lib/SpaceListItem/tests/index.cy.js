import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of space-list-item', () => {
    cy.visit(`/space-list-item`)
      .get(`.${prefix}-list-item`)
      .should('be.visible')
      .percySnapshot();
  });
});

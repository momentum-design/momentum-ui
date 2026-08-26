import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of list-item-meeting', () => {
    cy.visit(`/list-item-meeting`)
      .get(`.${prefix}-list-item-meeting`)
      .should('be.visible')
      .percySnapshot();
  });
});

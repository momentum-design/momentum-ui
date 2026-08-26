import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of content item', () => {
    cy.visit(`/content-item`)
      .get(`.${prefix}-content`)
      .should('be.visible')
      .percySnapshot();
  });
});

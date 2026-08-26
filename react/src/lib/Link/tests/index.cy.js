import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of link', () => {
    cy.visit(`/link`)
      .get(`.${prefix}-link`)
      .should('be.visible')
      .percySnapshot();
  });
});

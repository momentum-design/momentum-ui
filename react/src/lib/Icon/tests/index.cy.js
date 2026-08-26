import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of icon', () => {
    cy.visit(`/icon`)
      .get(`.${prefix}-icon`)
      .should('be.visible')
      .percySnapshot();
  });
});

import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of radio', () => {
    cy.visit(`/radio`)
      .get(`.${prefix}-radio`)
      .should('be.visible')
      .percySnapshot();
  });
});

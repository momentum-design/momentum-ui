import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of accordion', () => {
    cy.visit(`/accordion`)
      .get(`.${prefix}-accordion`)
      .should('be.visible')
      .percySnapshot();
  });
});

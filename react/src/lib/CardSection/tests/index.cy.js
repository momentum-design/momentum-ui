import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of card section', () => {
    cy.visit(`/card-section`)
      .get(`.${prefix}-card-section`)
      .should('be.visible')
      .percySnapshot();
  });
});

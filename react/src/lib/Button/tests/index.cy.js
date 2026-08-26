import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of button', () => {
    cy.visit(`/button`)
      .get(`.${prefix}-button`)
      .should('be.visible')
      .percySnapshot();
  });
});

import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of button group', () => {
    cy.visit(`/button-group`)
      .get(`.${prefix}-button-group`)
      .should('be.visible')
      .percySnapshot();
  });
});

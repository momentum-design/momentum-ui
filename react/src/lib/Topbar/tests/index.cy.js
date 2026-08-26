import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  before(() => {
    cy.visit(`/topbar`);
    cy.viewport(1200, 660);
  });

  it('snapshot of topbar', () => {
    cy.get(`.${prefix}-top-bar`)
      .should('be.visible')
      .percySnapshot();
  });
});

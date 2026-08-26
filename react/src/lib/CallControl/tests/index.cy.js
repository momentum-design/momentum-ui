import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of call control', () => {
    cy.visit(`/call-control`)
      .get(`.${prefix}-call-control`)
      .should('be.visible')
      .percySnapshot();
  });
});

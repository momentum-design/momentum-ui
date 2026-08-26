import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of activity button', () => {
    cy.visit(`/activity-button`)
      .get(`.${prefix}-activity`)
      .should('be.visible')
      .percySnapshot();
  });
});

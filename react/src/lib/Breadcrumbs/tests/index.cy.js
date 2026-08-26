import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of breadcrumbs', () => {
    cy.visit(`/breadcrumbs`)
      .get(`.${prefix}-breadcrumbs`)
      .should('be.visible')
      .percySnapshot();
  });
});

import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of content item', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/content-item`)
      .get(`.${prefix}-content`)
      .should('be.visible')
      .percySnapshot();
  });
});

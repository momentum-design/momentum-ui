import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of editable-textfield', () => {
    cy.visit(`${Cypress.env('BASE_URL')}/editable-textfield`)
      .get(`.${prefix}-editable-textfield__button`)
      .should('be.visible')
      .percySnapshot();
  });
});

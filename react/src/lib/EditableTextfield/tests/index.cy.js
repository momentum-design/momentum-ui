import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of editable-textfield', () => {
    cy.visit(`/editable-textfield`)
      .get(`.${prefix}-editable-textfield__button`)
      .should('be.visible')
      .percySnapshot();
  });
});

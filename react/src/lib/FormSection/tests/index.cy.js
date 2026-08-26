import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of form section', () => {
    cy.visit(`/form-section`)
      .get(`.${prefix}-form__section`)
      .should('be.visible')
      .percySnapshot();
  });
});

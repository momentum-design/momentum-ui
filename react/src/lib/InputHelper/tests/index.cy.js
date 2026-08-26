import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of input-helper', () => {
    cy.visit(`/input-helper`)
      .get(`.${prefix}-input__help-text`)
      .should('be.visible')
      .percySnapshot();
  });
});

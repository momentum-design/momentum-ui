import { prefix } from '../../utils/index';

describe('@momentum-ui/react', () => {
  it('snapshot of modal', () => {
    const modalSelector = `.${prefix}-modal`;
    const examples = [
      '#default-1',
      '#default-2',
      '#full-1',
      '#full-2',
      '#small-1',
      '#small-2',
      '#large-1',
      '#large-2',
    ];

    cy.visit('/modal');
    examples.forEach((selector, index) => {
      cy.get(selector).click();
      cy.get(modalSelector).should('be.visible');
      cy.percySnapshot();
      if (index < examples.length - 1) {
        cy.get(modalSelector)
          .trigger('keydown', { which: 27, code: 'Escape', key: 'Escape' });
      }
    });
  });
});

import "./Accordion";
import "./AccordionItem";
import { withA11y } from "@storybook/addon-a11y";
import { html } from "lit-element";
import { boolean, withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Accordion",
  component: "md-accordion",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11u: {
      element: "md-accordion"
    }
  }
};

export const Default = () => html`
  <md-accordion>
    <md-accordion-item slot="accordion-item" label="Header №1">
      <div>Panel №1</div>
    </md-accordion-item>
    <md-accordion-item slot="accordion-item" label="Header №2">
      <div>Panel №2</div>
    </md-accordion-item>
  </md-accordion>
`;

export const Disabled = () => {
  const disabled = boolean("disabled", true);
  return html`
    <md-accordion>
      <md-accordion-item slot="accordion-item" label="Header №1">
        <div>Panel №1</div>
      </md-accordion-item>
      <md-accordion-item slot="accordion-item" label="Header №2" ?disabled=${disabled}>
        <div>Panel №2</div>
      </md-accordion-item>
    </md-accordion>
  `;
};

export const Expanded = () => {
  const expanded = boolean("expanded", true);
  return html`
    <md-accordion>
      <md-accordion-item slot="accordion-item" label="Header №1" ?expanded=${expanded}>
        <div>Panel №1</div>
      </md-accordion-item>
      <md-accordion-item slot="accordion-item" label="Header №2">
        <div>Panel №2</div>
      </md-accordion-item>
    </md-accordion>
  `;
};

export const Multiple = () => {
  return html`
    <md-accordion multiple>
      <md-accordion-item slot="accordion-item" label="Header №1" expanded>
        <div>Panel №1</div>
      </md-accordion-item>
      <md-accordion-item slot="accordion-item" label="Header №2">
        <div>Panel №2</div>
      </md-accordion-item>
      <md-accordion-item slot="accordion-item" label="Header №3" expanded>
        <div>Panel №3</div>
      </md-accordion-item>
      <md-accordion-item slot="accordion-item" label="Header №4" disabled>
        <div>Panel №4</div>
      </md-accordion-item>
      <md-accordion-item slot="accordion-item" label="Header №5">
        <div>Panel №5</div>
      </md-accordion-item>
    </md-accordion>
  `;
};

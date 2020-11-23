import "@/components/accordion/Accordion";
import "@/components/accordion/AccordionItem";
import { html } from "lit-element";

export const accordionTemplate = html`
  <md-accordion>
    <md-accordion-item slot="accordion-item" label="Header №1">
      <div>Panel №1</div>
    </md-accordion-item>
    <md-accordion-item slot="accordion-item" label="Header №2">
      <div>Panel №2</div>
    </md-accordion-item>
    <md-accordion-item slot="accordion-item" label="Header №3">
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

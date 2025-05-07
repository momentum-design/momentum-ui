import "@/components/accordion/Accordion";
import "@/components/accordion/AccordionItem";
import "@/components/input/Input";
import { html } from "lit-element";

export const accordionTemplate = html`
  <style>
    .test-class {
      background-color: aliceblue;
      flex-direction: column;
      text-align: left;
      padding: 0.5rem;
      border-radius: 0.5rem;
    }
    md-accordion-item.part-demo::part(accordion-header) {
      background-color: #c7c7c7;
    }
  </style>
  <h3>Default</h3>
  <md-accordion class="part-demo">
    <md-accordion-item slot="accordion-item" label="Header №1" expanded class="part-demo">
      <div slot="header-content" class="test-class">
        <h4>Slotted Header Content</h4>
        <p>lorem ipsum ploppum bootum flossy noop</p>
      </div>
      <div>Panel №1</div>
    </md-accordion-item>
    <md-accordion-item slot="accordion-item" label="Header №2">
      <div>Panel №2</div>
      <md-input type="text"></md-input>
      <md-input type="text" disabled></md-input>
      <md-input type="text"></md-input>
    </md-accordion-item>
    <md-accordion-item slot="accordion-item" label="Header №3" expanded>
      <div>Panel №3</div>
      <md-input type="text"></md-input>
    </md-accordion-item>
    <md-accordion-item slot="accordion-item" label="Header №4" disabled>
      <div>Panel №4</div>
    </md-accordion-item>
    <md-accordion-item slot="accordion-item" label="Header №5">
      <div>Panel №5</div>
    </md-accordion-item>
  </md-accordion>
  <h3>Multiline</h3>
  <md-accordion multiple>
    <md-accordion-item slot="accordion-item" label="Header №1" expanded>
      <div>Panel №1</div>
    </md-accordion-item>
    <md-accordion-item slot="accordion-item" label="Header №2" expanded>
      <div>Panel №2</div>
      <md-input type="text"></md-input>
      <md-input type="text" disabled></md-input>
      <md-input type="text"></md-input>
    </md-accordion-item>
    <md-accordion-item slot="accordion-item" label="Header №3">
      <div>Panel №3</div>
      <md-input type="text"></md-input>
    </md-accordion-item>
    <md-accordion-item slot="accordion-item" label="Header №4" disabled expanded>
      <div>Panel №4</div>
    </md-accordion-item>
    <md-accordion-item slot="accordion-item" label="Header №5">
      <div>Panel №5</div>
    </md-accordion-item>
  </md-accordion>
  <hr />
  <h3>Container not focusable</h3>
  <md-accordion multiple nocontainerfocusable>
    <md-accordion-item slot="accordion-item" label="Header №2">
      <div>Panel №2</div>
      <md-input type="text"></md-input>
    </md-accordion-item>
    <md-accordion-item slot="accordion-item" label="Header №2">
      <div slot="header-content">Panel №2</div>
      <md-input type="text"></md-input>
      <md-input type="text" disabled></md-input>
      <md-input type="text"></md-input>
    </md-accordion-item>
  </md-accordion>
`;

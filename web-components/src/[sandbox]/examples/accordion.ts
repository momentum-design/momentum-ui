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
  <md-input ?customInputDiv=${true} label="Normal" containerSize="small-12" shape="pill" searchable clear autofocus placeholder="Editable Field"></md-input>
  <md-combobox ?customInputDiv=${true} with-custom-content>
    <div slot="one" aria-label="Facebook" display-value="Facebook">
      <span>Facebook</span>
      <md-icon name="icon-facebook_16"></md-icon>
    </div>
    <div slot="two" aria-label="Twitter" display-value="Twitter">
      <span class="company-value">Twitter</span>
      <md-icon name="icon-twitter_16"></md-icon>
    </div>
    <div slot="three" aria-label="Wikipedia" display-value="Wikipedia">
      <span class="company-value">Wikipedia</span>
      <md-icon name="icon-wikipedia_16"></md-icon>
    </div>
    <div slot="four" aria-label="Google" display-value="Google">
      <span class="company-value">Google</span>
      <md-icon name="icon-google_16"></md-icon>
    </div>
  </md-combobox>
  <md-combobox with-custom-content>
    <div slot="one" aria-label="Facebook" display-value="Facebook">
      <span>Facebook</span>
      <md-icon name="icon-facebook_16"></md-icon>
    </div>
    <div slot="two" aria-label="Twitter" display-value="Twitter">
      <span class="company-value">Twitter</span>
      <md-icon name="icon-twitter_16"></md-icon>
    </div>
    <div slot="three" aria-label="Wikipedia" display-value="Wikipedia">
      <span class="company-value">Wikipedia</span>
      <md-icon name="icon-wikipedia_16"></md-icon>
    </div>
    <div slot="four" aria-label="Google" display-value="Google">
      <span class="company-value">Google</span>
      <md-icon name="icon-google_16"></md-icon>
    </div>
  </md-combobox>
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
`;

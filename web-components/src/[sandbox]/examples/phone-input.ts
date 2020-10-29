import "@/components/phone-input/PhoneInput";
import { html } from "lit-element";

export const phoneInputTemplate = html`
  <h2>md-phone-input</h2>

  <div>
    <div class="row">
      <md-phone-input
        errorMessage="This phone number is invalid"
        @phoneinput-keydown="${(e: CustomEvent) => console.log("keydown: ", e.detail.value)}"
        @phoneinput-blur="${(e: CustomEvent) => console.log("blur: ", e.detail.value, " is valid: ", e.detail.isValid)}"
        @phoneinput-change="${(e: CustomEvent) =>
          console.log("change: ", e.detail.value, " is valid: ", e.detail.isValid)}"
      ></md-phone-input>
    </div>
    <div class="row">
      <md-phone-input
        pill
        errorMessage="This phone number is invalid"
        placeholder="+7"
        @phoneinput-keydown="${(e: CustomEvent) => console.log("keydown: ", e.detail.value)}"
        @phoneinput-blur="${(e: CustomEvent) => console.log("blur: ", e.detail.value, " is valid: ", e.detail.isValid)}"
        @phoneinput-change="${(e: CustomEvent) =>
          console.log("change: ", e.detail.value, " is valid: ", e.detail.isValid)}"
      ></md-phone-input>
    </div>
  </div>
`;

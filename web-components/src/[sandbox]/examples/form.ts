import "@/components/button/Button";
import "@/components/form/Form";
import "@/components/input/Input";
import { customElement, html, internalProperty, LitElement, PropertyValues } from "lit-element";

@customElement("form-sandbox")
export class FormSandbox extends LitElement {
  @internalProperty() private isFormValid = false;
  @internalProperty() private isNameFilled = false;
  @internalProperty() private isCityFilled = false;

  handleFormSubmit(event: Event) {
    event.preventDefault();
    console.info("Form is submitted!!!");
  }

  handleNameInput(event: InputEvent) {
    const { target } = event;

    this.isNameFilled = false;

    if (target && (target as HTMLInputElement).value.length) {
      this.isNameFilled = true;
    }
  }

  handleCityInput(event: InputEvent) {
    const { target } = event;

    this.isCityFilled = false;

    if (target && (target as HTMLInputElement).value.length) {
      this.isCityFilled = true;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("submit", this.handleFormSubmit);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("submit", this.handleFormSubmit);
  }

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);
    if (this.isNameFilled && this.isCityFilled) {
      this.isFormValid = true;
    } else {
      this.isFormValid = false;
    }
  }

  render() {
    return html`
      <md-form autofill-name="address" ?is-valid=${this.isFormValid} @form-submitted=${this.handleFormSubmit}>
        <md-input id="unique-name" required @input=${this.handleNameInput} placeholder="Please enter Name"></md-input>
        <md-input id="unique-city" required @input=${this.handleCityInput} placeholder="Please enter City"></md-input>
        <md-button type="submit" color="orange" ?disabled=${!this.isFormValid}>Submit</md-button>
      </md-form>
    `;
  }
}

export const formTemplate = html`
  <h3>Default (Auto-Valid)</h3>
  <md-form is-valid @form-submitted=${() => console.info("Form Submitted!!!")}>
    <md-input label="Name" name="name"></md-input>
    <md-input label="Address" name="address"></md-input>
    <md-input label="Email" name="email"></md-input>
    <md-input label="Phone" name="phone"></md-input>
    <md-button type="submit" label="Please Submit Form" size="40" variant="primary">Submit</md-button>
  </md-form>
  <h3>Allow redirect after submit (Valid)</h3>
  <md-form target="_blank" allow-redirect @form-submitted=${() => console.info("Form Submitted!!!")}>
    <md-input name="address"></md-input>
  </md-form>
  <h3>Disallow redirect after submit (Valid)</h3>
  <md-form target="_blank" is-valid @form-submitted=${() => console.info("Form Submitted!!!")}>
    <md-input name="address"></md-input>
  </md-form>
  <h3>Not Valid</h3>
  <md-form @form-submitted=${() => console.info("Form Submitted!!!")}>
    <md-input name="address"></md-input>
    <button type="submit">Submit</button>
  </md-form>
  <h3>No Validation</h3>
  <md-form no-validate @form-submitted=${() => console.info("Form Submitted!!!")}>
    <md-input name="address"></md-input>
    <md-button type="submit" variant="green">Submit</md-button>
  </md-form>
  <h3>Autofill Name Attribute</h3>
  <md-form no-validate autofill-name="address" @form-submitted=${() => console.info("Form Submitted!!!")}>
    <md-input></md-input>
    <md-button type="submit" variant="green">Submit</md-button>
  </md-form>
  <h3>Form Submit Handle</h3>
  <form-sandbox></form-sandbox>
`;

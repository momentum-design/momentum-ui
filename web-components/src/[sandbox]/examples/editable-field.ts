/* eslint-disable prettier/prettier */
import "@/components/editable-textfield/EditableTextfield";
import { Input } from "@/components/input/Input";
import { ValidationRegex } from "@/utils/validations.ts";
import { customElement, html, LitElement, property } from "lit-element";
import { nothing } from "lit-html";

const successMessageArr: Input.Message = {
  message: "This is where the message would be.",
  type: "success"
};
const errorMessageArr: Input.Message = {
  message: "This is where the message would be.",
  type: "error"
};
const warningMessageArr: Input.Message = {
  message: "This is where the message would be.",
  type: "warning"
};



@customElement("editable-field-template-sandbox")
export class EditableFieldTemplateSandbox extends LitElement {
  @property({ type: Boolean }) isModalOpen = false;
  @property({ type: Boolean }) isDialogOpen = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: String }) textChanged = "";


  connectedCallback() {
    super.connectedCallback()
    this.addEventListener("invalid", this.setErrorMessage)
  }
  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("invalid", this.setErrorMessage)
  }

  setErrorMessage = () => {
    console.log("Validation Error Occurred")
    this.error = true
  }

  resetErrorMessage = () => {
    this.error = false
  }

  renderErrorMessage() {
    return (this.error ? html`
      <div style="padding: 1rem; background:red">THERE IS A VALIDATION ERROR ON THIS PAGE!!</div>
    ` : nothing)
  }

  render() {
    return html`
      <p>Get new text that was changed in editable field - ${this.textChanged}</p>
      <h4>With composed text</h4>
      <md-editable-field>
        Test text in slot
      </md-editable-field>
      <h4>Disabled</h4>
      <md-editable-field content="disabled for editing but readable" disabled></md-editable-field>
      <h4>With no composed text and default placeholder</h4>
      <md-editable-field></md-editable-field>
      <h4>With content passed in attribute</h4>
      <md-editable-field content="attribute text"></md-editable-field>
      <hr />
      <md-editable-field alert .message=${{ ...successMessageArr }}>
        Success Status
      </md-editable-field>
      <hr />
      <md-editable-field alert .message=${{ ...errorMessageArr }}>
        Error Status
      </md-editable-field>
      <hr />
      <md-editable-field alert .message=${{ ...warningMessageArr }}>
        Warning Status
      </md-editable-field>
      
      <h4>Errors and Warnings but no message</h4>
      <md-editable-field content="warning message" hideMessage alert .message=${{ ...warningMessageArr }}>
        Warning Status
      </md-editable-field>
      <md-editable-field content="error message" hideMessage alert .message=${{ ...errorMessageArr }}>
        Error Status
      </md-editable-field>
      <h4>Validation Types</h4>
      <h5>integer</h5>
      <md-editable-field type="integer">
        123
      </md-editable-field>
      <h5>decimal</h5>
      <md-editable-field type="decimal">
        123.321
      </md-editable-field>
      <h5>date pattern set</h5>
      <md-editable-field pattern=^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\\d|3[01])[/](19|20)\\d{2}$> 12/12/2020 </md-editable-field>
        <h5>time pattern w/ hideMessage set</h5>
        <md-editable-field hideMessage pattern=${ValidationRegex.timeString}>
          12:30PM
        </md-editable-field>
        ${this.renderErrorMessage()}
        <br>
        <md-button @click=${this.resetErrorMessage}>Reset Error</md-button>
    `;
  }
}

export const editableField = html`
  <editable-field-template-sandbox></editable-field-template-sandbox>
`;

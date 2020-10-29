import "@/components/editable-textfield/EditableTextfield";
import { Input } from "@/components/input/Input";
import { customElement, html, LitElement, property } from "lit-element";

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
  @property({ type: String }) textChanged = "";

  render() {
    return html`
      <p>Get new text that was changed in editable field - ${this.textChanged}</p>
      <h4>With composed text</h4>
      <md-editable-field>
        Test text in slot
      </md-editable-field>
      <h4>Disabled</h4>
      <md-editable-field content="disabled for editing but readable" disabled>
        Test text in slot
      </md-editable-field>
      <h4>With no composed text and default placeholder</h4>
      <md-editable-field></md-editable-field>
      <hr />
      <md-editable-field .message=${{ ...successMessageArr }}>
        Success Status
      </md-editable-field>
      <hr />
      <md-editable-field .message=${{ ...errorMessageArr }}>
        Error Status
      </md-editable-field>
      <hr />
      <md-editable-field .message=${{ ...warningMessageArr }}>
        Warning Status
      </md-editable-field>

      <h4>Errors and Warnings but no message</h4>
      <md-editable-field content="warning message" hideMessage .message=${{ ...warningMessageArr }}>
        Warning Status
      </md-editable-field>
      <md-editable-field content="error message" hideMessage .message=${{ ...errorMessageArr }}>
        Error Status
      </md-editable-field>
    `;
  }
}

export const editableField = html`
  <editable-field-template-sandbox></editable-field-template-sandbox>
`;

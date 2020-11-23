import { numInputTypes } from "@/utils/enums";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { Input } from "@/components/input/Input";
import "@/components/editable-textfield/EditableTextfield";
import { alignment } from "@/components/editable-textfield/EditableTextfield";

export default {
  title: "EditableTextfield",
  component: "md-editable-field",
  decorators: [withKnobs, withA11y],
  argTypes: {
    isEditing: { table: { disable: true } },
    alert: { table: { disable: true } },
    hideMessage: { table: { disable: true } },
    editableField: { table: { disable: true } },
    reportValidity: { table: { disable: true } },
    checkValidity: { table: { disable: true } },
    handleFocus: { table: { disable: true } },
    handleKeydown: { table: { disable: true } },
    handleBlur: { table: { disable: true } },
    overflowStyles: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-editable-field"
    }
  }
};

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

type EditableMap = { [key: string]: any };

const messages: EditableMap = {
  success: successMessageArr,
  error: errorMessageArr,
  warning: warningMessageArr
};

export const Default = () => {
  const darkTheme = boolean("darkMode", false);
  const fieldAlignment = select("Alignment", alignment, "left");
  const disabledSetting = boolean("disabled", false);
  const messageStatus = boolean("Add message Status", false);
  const inputType = boolean("Input Type", false);
  const inputValid = boolean("Validation Pattern", false);


  if (messageStatus) {
    const messageOptions = ["success", "error", "warning"];
    const message = select("message", messageOptions, "error");

    return html`
    <md-theme class="theme-toggle" id="button" ?darkTheme=${darkTheme}>
      <md-editable-field .message=${{ ...messages[message] }}>
        ${message} Status
      </md-editable-field>
    </md-theme>
    `;
  } else if (inputType) {
    const inputTypes = numInputTypes;
    const inputType = select("Input Type", inputTypes, "text");

    return html`
    <md-theme class="theme-toggle" id="editable-field" ?darkTheme=${darkTheme}>
      <md-editable-field .message=${errorMessageArr} numberType=${inputType} pattern=${regexString}>
        12345
      </md-editable-field>
    </md-theme>
    `;
  } else if (inputValid) {
    const defaultRegex = "^([+-]?[1-9]\\d*|0)$";
    const regexString = text("Regex String", defaultRegex);

    return html`
    <md-theme class="theme-toggle" id="editable-field" ?darkTheme=${darkTheme}>
      <md-editable-field .message=${errorMessageArr} pattern=${regexString}>
        Test Regex Match . . .
      </md-editable-field>
    </md-theme>
  `;
  } else {
    return html`
    <md-theme class="theme-toggle" id="editable-field" ?darkTheme=${darkTheme}>
      <md-editable-field ?disabled=${disabledSetting} alignment=${fieldAlignment} content="Text from Content Attribute">
        Test editable text in slot
      </md-editable-field>
    <md-theme>
    `;
  }
};

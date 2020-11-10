import { numInputTypes } from "@/utils/enums";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import { Input } from "../input/Input";
import "./EditableTextfield";
import { alignment } from "./EditableTextfield";

export default {
  title: "EditableTextfield",
  component: "md-editable-field",
  decorators: [withKnobs, withA11y],
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

type map = { [key: string]: any };

const messages: map = {
  // eslint-disable-next-line prettier/prettier
  "success": successMessageArr,
  // eslint-disable-next-line prettier/prettier
  "error": errorMessageArr,
  // eslint-disable-next-line prettier/prettier
  "warning": warningMessageArr
};

export const Default = () => {
  const defaultAlignment = "left";
  const label = "Alignment";
  const fieldAlignment = select(label, alignment, defaultAlignment);

  return html`
    <md-editable-field alignment=${fieldAlignment} content="Text from Content Attribute"> </md-editable-field>
  `;
};
export const disabled = () => {
  const defaultAlignment = "left";
  const label = "Alignment";
  const fieldAlignment = select(label, alignment, defaultAlignment);
  const disabledSetting = boolean("disabled", true);

  return html`
    <md-editable-field ?disabled=${disabledSetting} alignment=${fieldAlignment} content="Test editable text"
      >Placeholder content</md-editable-field
    >
  `;
};

export const SlotText = () => {
  const defaultAlignment = "left";
  const label = "Alignment";
  const fieldAlignment = select(label, alignment, defaultAlignment);
  const disabledSetting = boolean("disabled", false);

  return html`
    <md-editable-field ?disabled=${disabledSetting} alignment=${fieldAlignment}>
      Test editable text in slot
    </md-editable-field>
  `;
};

export const Message = () => {
  const messageOptions = ["success", "error", "warning"];
  const defaultValue = "error";
  const message = select("message", messageOptions, defaultValue);

  return html`
    <md-editable-field .message=${{ ...messages[message] }}>
      ${message} Status
    </md-editable-field>
  `;
};
export const ValidationInputType = () => {
  const inputTypes = numInputTypes;
  const defaultValue = "text";
  const inputType = select("Input Type", inputTypes, defaultValue);

  return html`
    <md-editable-field .message=${errorMessageArr} numberType=${inputType}>
      12345
    </md-editable-field>
  `;
};
export const ValidationPattern = () => {
  const defaultRegex = "^([+-]?[1-9]\\d*|0)$";
  const regexString = text("Regex String", defaultRegex);

  return html`
    <md-editable-field .message=${errorMessageArr} pattern=${regexString}>
      Test Regex Match . . .
    </md-editable-field>
  `;
};

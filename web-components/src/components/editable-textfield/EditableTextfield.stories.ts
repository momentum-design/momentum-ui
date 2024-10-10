/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/editable-textfield/EditableTextfield";
import { ThemeNameValues } from "@/components/theme/Theme";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";
import { numInputTypes } from "../../utils/enums"; // Keep type import as a relative path
import { Input } from "../input/Input"; // Keep type import as a relative path
import { alignment } from "./EditableTextfield"; // Keep type import as a relative path

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

type EditableMap = { [key: string]: Input.Message };

const messages: EditableMap = {
  success: successMessageArr,
  error: errorMessageArr,
  warning: warningMessageArr
};

export const EditableTextfield = (args: Args) => {
  if (args.messageStatus) {
    return html`
      <md-theme class="theme-toggle" id="editable-field" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-editable-field .message=${{ ...messages[args.message] }}> ${args.message} Status </md-editable-field>
      </md-theme>
    `;
  } else if (args.inputDiff) {
    return html`
      <md-theme class="theme-toggle" id="editable-field" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-editable-field .message=${errorMessageArr} type=${args.inputType}> 12345 </md-editable-field>
      </md-theme>
    `;
  } else if (args.inputValid) {
    return html`
      <md-theme class="theme-toggle" id="editable-field" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-editable-field .message=${errorMessageArr} .pattern=${args.regexString}>
          Test Regex Match . . .
        </md-editable-field>
      </md-theme>
    `;
  } else {
    return html`
      <md-theme class="theme-toggle" id="editable-field" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-editable-field
          max-lines="2"
          ?disabled=${args.disabledSetting}
          .alignment=${args.fieldAlignment}
          content="Text from Content Attribute"
        >
          Test editable text in slot
        </md-editable-field>
      </md-theme>
    `;
  }
};

export default {
  title: "Components/Editable Textfield",
  component: "md-editable-field",
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
    overflowStyles: { table: { disable: true } },
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    maxLines: { control: "number", defaultValue: 2 },
    fieldAlignment: { control: { type: "select", options: alignment }, defaultValue: "left" },
    disabledSetting: { control: "boolean", defaultValue: false },
    messageStatus: { control: "boolean", defaultValue: false },
    inputDiff: { control: "boolean", defaultValue: false },
    inputValid: { control: "boolean", defaultValue: false },
    message: { control: { type: "select", options: ["success", "error", "warning"] }, defaultValue: "error" },
    inputType: { control: { type: "select", options: numInputTypes }, defaultValue: "text" },
    regexString: { control: "text", description: "Regex String", defaultValue: "^([+-]?[1-9]\\d*|0)$" }
  },
  parameters: {
    a11y: {
      element: "md-editable-field"
    }
  }
};

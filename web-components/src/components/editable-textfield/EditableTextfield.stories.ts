/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/editable-textfield/EditableTextfield";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { numInputTypes } from "@/utils/enums";
import { Input } from "@/components/input/Input";
import { alignment } from "./EditableTextfield";

const successMessageArr: Input.Message = { message: "This is where the message would be.", type: "success" };
const errorMessageArr: Input.Message = { message: "This is where the message would be.", type: "error" };
const warningMessageArr: Input.Message = { message: "This is where the message would be.", type: "warning" };

type EditableMap = { [key: string]: Input.Message };

const messages: EditableMap = { success: successMessageArr, error: errorMessageArr, warning: warningMessageArr };

const render = (args: Args) => {
  if (args.messageStatus) {
    return html`
      <md-editable-field .message=${{ ...messages[args.message] }}> ${args.message} Status </md-editable-field>
    `;
  } else if (args.inputDiff) {
    return html` <md-editable-field .message=${errorMessageArr} type=${args.inputType}> 12345 </md-editable-field> `;
  } else if (args.inputValid) {
    return html`
      <md-editable-field .message=${errorMessageArr} .pattern=${args.regexString}>
        Test Regex Match . . .
      </md-editable-field>
    `;
  } else {
    return html`
      <md-editable-field
        max-lines="2"
        ?disabled=${args.disabledSetting}
        .alignment=${args.fieldAlignment}
        content="Text from Content Attribute"
      >
        Test editable text in slot
      </md-editable-field>
    `;
  }
};

export const EditableTextfield: StoryObj = {
  args: {
    disabledSetting: false,
    messageStatus: false,
    inputDiff: false,
    inputValid: false,
    message: "error",
    inputType: "text",
    regexString: "^([+-]?[1-9]\\d*|0)$",
    fieldAlignment: "left"
  },
  render: render
};

const meta: Meta = {
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
    maxLines: { control: "number", defaultValue: 2 },
    fieldAlignment: { control: { type: "select" }, options: alignment },
    disabledSetting: { control: "boolean" },
    messageStatus: { control: "boolean" },
    inputDiff: { control: "boolean" },
    inputValid: { control: "boolean" },
    message: { control: { type: "select" }, options: ["success", "error", "warning"] },
    inputType: { control: { type: "select" }, options: numInputTypes },
    regexString: { control: "text", description: "Regex String" }
  },
  parameters: { a11y: { context: "md-editable-field" } }
};

export default meta;

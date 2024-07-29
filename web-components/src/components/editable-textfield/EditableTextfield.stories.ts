/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/editable-textfield/EditableTextfield";
import { ThemeNameValues } from "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { numInputTypes } from "../../utils/enums"; // Keep type import as a relative path
import { Input } from "../input/Input"; // Keep type import as a relative path
import { alignment } from "./EditableTextfield"; // Keep type import as a relative path

export default {
  title: "Components/Editable Textfield",
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

export const EditableTextfield = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const fieldAlignment = select("Alignment", alignment, "left");
  const disabledSetting = boolean("disabled", false);
  const messageStatus = boolean("Add message Status", false);
  const inputDiff = boolean("Input Type", false);
  const inputValid = boolean("Validation Pattern", false);

  if (messageStatus) {
    const messageOptions = ["success", "error", "warning"];
    const message = select("message", messageOptions, "error");

    return html`
      <md-theme class="theme-toggle" id="editable-field" ?darkTheme=${darkTheme} theme=${theme}>
        <md-editable-field .message=${{ ...messages[message] }}>
          ${message} Status
        </md-editable-field>
      </md-theme>
    `;
  } else if (inputDiff) {
    const inputTypes = numInputTypes;
    const inputType = select("Input Type", inputTypes, "text");

    return html`
      <md-theme class="theme-toggle" id="editable-field" ?darkTheme=${darkTheme} theme=${theme}>
        <md-editable-field .message=${errorMessageArr} numberType=${inputType}>
          12345
        </md-editable-field>
      </md-theme>
    `;
  } else if (inputValid) {
    const regexString = text("Regex String", "^([+-]?[1-9]\\d*|0)$");

    return html`
      <md-theme class="theme-toggle" id="editable-field" ?darkTheme=${darkTheme} theme=${theme}>
        <md-editable-field .message=${errorMessageArr} .pattern=${regexString}>
          Test Regex Match . . .
        </md-editable-field>
      </md-theme>
    `;
  } else {
    return html`
      <md-theme class="theme-toggle" id="editable-field" ?darkTheme=${darkTheme} theme=${theme}>
        <md-editable-field
          maxLines="2"
          ?disabled=${disabledSetting}
          .alignment=${fieldAlignment}
          content="Text from Content Attribute"
        >
          Test editable text in slot
        </md-editable-field>
      </md-theme>
    `;
  }
};

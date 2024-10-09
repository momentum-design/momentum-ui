/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import "@/components/icon/Icon";
import "@/components/input/Input";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";
import { containerSize, iconNames, iconPosition, inputShape, inputType, nestedLevel } from "./Input"; // Keep type import as a relative path

const messageArr = [
  {
    label: "",
    message: "",
    type: "default"
  },
  {
    label: "Success",
    message: "This is where the success message.",
    type: "success"
  },
  {
    label: "Warning",
    message: "This is where the warning message.",
    type: "warning"
  },
  {
    label: "Error",
    message: "This is where the error message.",
    type: "error"
  }
];

export const Input = (args: Args) => {
  if (args.hasNested) {
    return html`
      <md-theme class="theme-toggle" id="input" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-input label="Default Input"></md-input>
        <md-input label="Input Nested Level" containerSize="small-12" .nestedLevel=${args.nested}></md-input>
      </md-theme>
    `;
  } else if (args.hasIcon) {
    return html`
      <md-theme class="theme-toggle" id="input" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-input
          label="Input Icon"
          containerSize="small-12"
          placeholder="Enter Text"
          .auxiliaryContentPosition=${args.position as any}
        >
          <md-icon slot="input-section${args.position === "after" ? "-right" : ""}" name=${args.nameIcon}></md-icon>
        </md-input>
      </md-theme>
    `;
  } else {
    return html`
      <md-theme class="theme-toggle" id="input" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-input
          .label=${args.label}
          .placeholder=${args.placeholder}
          .messageArr=${[args.messageValue]}
          .value=${args.value}
          .containerSize="${args.size}"
          .disabled=${args.disabled}
          .shape=${args.shape}
          ?readOnly=${args.readOnly}
          ?multiline=${args.multiline}
          .searchable=${args.searchable}
          ?clear=${args.clear}
          .secondaryLabel=${args.secondaryLabel}
          .type=${args.type}
          .helpText=${args.helpText}
          @input-change=${action("change")}
          @input-blur=${action("focus out")}
          @input-focus=${action("focus in")}
        >
        </md-input>
      </md-theme>
    `;
  }
};

export default {
  title: "Components/Input",
  component: "md-input",
  argTypes: {
    clearAriaLabel: { table: { disable: true } },
    isFilled: { table: { disable: true } },
    isLoading: { table: { disable: true } },
    input: { table: { disable: true } },
    inputClassMap: { table: { disable: true } },
    inputWrapperClassMap: { table: { disable: true } },
    inputTemplateClassMap: { table: { disable: true } },
    multi: { table: { disable: true } },
    autofocus: { table: { disable: true } },
    htmlId: { table: { disable: true } },
    theme: { conrol: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    placeholder: { control: "text", defaultValue: "Enter Text" },
    label: { control: "text", defaultValue: "Label" },
    value: { control: "text", defaultValue: "Value Text" },
    size: { control: { type: "select", options: containerSize }, defaultValue: "small-12" },
    messageValue: { control: { type: "select", options: messageArr }, defaultValue: messageArr[1] },
    disabled: { control: "boolean", defaultValue: false },
    readOnly: { control: "boolean", defaultValue: false },
    shape: { control: { type: "select", options: inputShape }, defaultValue: "pill" },
    multiline: { control: "boolean", defaultValue: false },
    searchable: { control: "boolean", defaultValue: false },
    clear: { control: "boolean", defaultValue: false },
    type: { control: { type: "select", options: inputType }, defaultValue: "text" },
    secondaryLabel: { control: "text", defaultValue: "" },
    helpText: { control: "text", defaultValue: "" },
    hasNested: { control: "boolean", defaultValue: false },
    hasIcon: { control: "boolean", defaultValue: false },
    nested: { control: { type: "select", options: nestedLevel }, defaultValue: 1 },
    position: { control: { type: "select", options: iconPosition }, defaultValue: "before" },
    nameIcon: { control: { type: "select", options: iconNames }, defaultValue: "accessibility_16" },
    newMomentum: { control: "boolean", defaultValue: false }
  },
  parameters: {
    a11y: {
      element: "md-input"
    }
  }
};

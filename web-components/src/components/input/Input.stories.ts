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
import { action } from "@storybook/addon-actions";
import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { containerSize, iconNames, iconPosition, inputShape, inputType, nestedLevel } from "./Input"; // Keep type import as a relative path

const messageArr = [
  {
    type: "default" as const,
    message: "",
    id: undefined,
    ariaLive: undefined
  },
  {
    type: "success" as const,
    message: "This is where the success message.",
    id: "success-message",
    ariaLive: "polite" as const
  },
  {
    type: "warning" as const,
    message: "This is where the warning message.",
    id: "warning-message",
    ariaLive: "polite" as const
  },
  {
    type: "error" as const,
    message: "This is where the error message.",
    id: "error-message",
    ariaLive: "assertive" as const
  },
  {
    type: "priority" as const,
    message: "This is where the priority message.",
    id: "priority-message",
    ariaLive: "assertive" as const
  }
];

export const Input: StoryObj = {
  args: {
    placeholder: "Enter Text",
    label: "Label",
    value: "Value Text",
    size: "small-12",
    messageValue: "Message 2",
    disabled: false,
    readOnly: false,
    shape: "",
    multiline: false,
    searchable: false,
    clear: false,
    type: "text",
    secondaryLabel: "",
    helpText: "",
    hasNested: false,
    hasIcon: false,
    nested: 1,
    position: "before",
    nameIcon: "accessibility_16",
    newMomentum: true,
    showDropdown: false,
    compact: false
  },
  render: (args: Args) => {
    const selectedMessage = messageArr.find((msg) => msg.type === args.messageType) || messageArr[0];

    if (args.hasNested) {
      return html`
        <md-input label="Default Input"></md-input>
        <md-input label="Input Nested Level" containerSize="small-12" .nestedLevel=${args.nested}></md-input>
      `;
    } else if (args.hasIcon) {
      return html`
        <md-input
          label="Input Icon"
          containerSize="small-12"
          placeholder="Enter Text"
          .auxiliaryContentPosition=${args.position as any}
          ?newMomentum=${args.newMomentum}
        >
          <md-icon slot="input-section${args.position === "after" ? "-right" : ""}" name=${args.nameIcon}></md-icon>
        </md-input>
      `;
    } else {
      return html`
        <md-input
          .label=${args.label}
          .placeholder=${args.placeholder}
          .messageArr=${selectedMessage.message ? [selectedMessage] : []}
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
          ?newMomentum=${args.newMomentum}
          ?showDropdown=${args.showDropdown}
          ?compact=${args.compact}
        >
        </md-input>
      `;
    }
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
    placeholder: { control: "text" },
    label: { control: "text" },
    value: { control: "text" },
    size: { control: { type: "select" }, options: containerSize },
    messageType: {
      control: { type: "select" },
      options: ["default", "success", "warning", "error", "priority"],
      description: "Type of message to display"
    },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    shape: { control: { type: "select" }, options: inputShape },
    multiline: { control: "boolean" },
    searchable: { control: "boolean" },
    clear: { control: "boolean" },
    type: { control: { type: "select" }, options: inputType },
    secondaryLabel: { control: "text" },
    helpText: { control: "text" },
    hasNested: { control: "boolean" },
    hasIcon: { control: "boolean" },
    nested: { control: { type: "select" }, options: nestedLevel },
    position: { control: { type: "select" }, options: iconPosition },
    nameIcon: { control: { type: "select" }, options: iconNames },
    newMomentum: { control: "boolean" }
  },
  parameters: {
    a11y: {
      element: "md-input"
    }
  }
};

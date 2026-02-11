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
import { action } from "storybook/actions";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import {
  containerSize,
  iconNames,
  iconPosition,
  Input as InputComponent,
  inputShape,
  inputType,
  nestedLevel
} from "./Input";

const messageArr: Record<string, InputComponent.Message[]> = {
  default: [],
  success: [
    {
      type: "success" as const,
      message: "This is where the success message.",
      id: "success-message",
      ariaLive: "polite" as const
    }
  ],
  warning: [
    {
      type: "warning" as const,
      message: "This is where the warning message.",
      id: "warning-message",
      ariaLive: "polite" as const
    }
  ],
  error: [
    {
      type: "error" as const,
      message: "This is where the error message.",
      id: "error-message",
      ariaLive: "assertive" as const
    }
  ],
  priority: [
    {
      type: "priority" as const,
      message: "This is where the priority message.",
      id: "priority-message",
      ariaLive: "assertive" as const
    }
  ]
};

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
    const selectedMessage = messageArr[args.messageType] || [];

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
          .messageArr=${selectedMessage}
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

export const NewMomentumMessages: StoryObj = {
  args: {
    searchable: false,
    clear: false,
    showDropdown: false,
    compact: false,
    disabled: false,
    readOnly: false,
    placeholder: "Enter text..."
  },
  render: (args: Args) => {
    const inputStates = [
      { type: "default" as const, label: "Default State", value: "Default input value" },
      { type: "success" as const, label: "Success State", value: "Success input value" },
      { type: "warning" as const, label: "Warning State", value: "Warning input value" },
      { type: "error" as const, label: "Error State", value: "Error input value" },
      { type: "priority" as const, label: "Priority State", value: "Priority input value" }
    ];

    return html`
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
        <h3>New Momentum Input States</h3>
        ${inputStates.map((state) => {
          const selectedMessage = messageArr[state.type] || [];

          return html`
            <md-input
              label=${state.label}
              placeholder=${args.placeholder}
              value=${state.value}
              .messageArr=${selectedMessage}
              ?newMomentum=${true}
              ?searchable=${args.searchable}
              ?clear=${args.clear}
              ?showDropdown=${args.showDropdown}
              ?compact=${args.compact}
              ?disabled=${args.disabled}
              ?readOnly=${args.readOnly}
              @input-change=${action(`${state.type}-change`)}
              @input-clear=${action(`${state.type}-clear`)}
              @input-focus=${action(`${state.type}-focus`)}
              @input-blur=${action(`${state.type}-blur`)}
              @input-keydown=${action(`${state.type}-keydown`)}
              @input-mousedown=${action(`${state.type}-mousedown`)}
              @input-dropdown-click=${action(`${state.type}-dropdown-click`)}
            ></md-input>
          `;
        })}
      </div>
    `;
  },
  argTypes: {
    searchable: {
      control: "boolean",
      description: "Show search icon on the left"
    },
    clear: {
      control: "boolean",
      description: "Show clear button when input has value"
    },
    showDropdown: {
      control: "boolean",
      description: "Show dropdown button for combobox functionality"
    },
    compact: {
      control: "boolean",
      description: "Use compact input size"
    },
    disabled: {
      control: "boolean",
      description: "Disable all inputs"
    },
    readOnly: {
      control: "boolean",
      description: "Make all inputs read-only"
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for all inputs"
    },

    label: { table: { disable: true } },
    value: { table: { disable: true } },
    size: { table: { disable: true } },
    messageType: { table: { disable: true } },
    shape: { table: { disable: true } },
    multiline: { table: { disable: true } },
    type: { table: { disable: true } },
    secondaryLabel: { table: { disable: true } },
    helpText: { table: { disable: true } },
    hasNested: { table: { disable: true } },
    hasIcon: { table: { disable: true } },
    nested: { table: { disable: true } },
    position: { table: { disable: true } },
    nameIcon: { table: { disable: true } },
    newMomentum: { table: { disable: true } },
    clearAriaLabel: { table: { disable: true } },
    isFilled: { table: { disable: true } },
    isLoading: { table: { disable: true } },
    input: { table: { disable: true } },
    inputClassMap: { table: { disable: true } },
    inputWrapperClassMap: { table: { disable: true } },
    inputTemplateClassMap: { table: { disable: true } },
    multi: { table: { disable: true } },
    autofocus: { table: { disable: true } },
    htmlId: { table: { disable: true } }
  },
  parameters: {
    docs: {
      description: {
        story:
          "Displays all four message types (default, success, warning, error, priority) with new momentum styling. Use the controls to toggle search icon, clear button, dropdown button, and other input features."
      }
    }
  }
};

const meta: Meta = {
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
      context: "md-input"
    }
  }
};

export default meta;

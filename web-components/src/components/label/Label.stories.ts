/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/input/Input";
import "@/components/label/Label";
import { action } from "storybook/actions";
import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit";

export default {
  title: "Components/Label",
  component: "md-label",
  argTypes: {
    radioLabel: { table: { disable: true } },
    checkboxLabel: { table: { disable: true } },
    toggleSwitchLabel: { table: { disable: true } },
    active: { table: { disable: true } },
    indeterminate: { table: { disable: true } },
    labelClassMap: { table: { disable: true } },
    withInput: { control: { type: "boolean" } }
  },
  parameters: {
    a11y: {
      element: "md-label"
    }
  }
};

export const Label: StoryObj = {
  args: {
    label: "Label",
    withInput: false,
    secondaryLabel: false
  },
  render: (args: Args) => {
    if (args.withInput) {
      return html`
        <md-input
          @label-click=${action("click")}
          .label=${args.label}
          placeholder="placeholder text"
          .secondaryLabel=${args.secondaryLabel}
        >
        </md-input>
      `;
    } else {
      return html` <md-label htmlFor="#">${args.label}</md-label> `;
    }
  }
};

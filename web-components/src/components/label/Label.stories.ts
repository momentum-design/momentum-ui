/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/input/Input";
import "@/components/label/Label";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";

export default {
  title: "Components/Label",
  component: "md-label",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    radioLabel: { table: { disable: true } },
    checkboxLabel: { table: { disable: true } },
    toggleSwitchLabel: { table: { disable: true } },
    active: { table: { disable: true } },
    indeterminate: { table: { disable: true } },
    labelClassMap: { table: { disable: true } },
    label: { control: "text", defaultValue: "Label" },
    withInput: { control: "boolean", defaultValue: false },
    secondaryLabel: { control: "text", defaultValue: "" }
  },
  parameters: {
    a11y: {
      element: "md-label"
    }
  }
};

export const Label = (args: Args) => {
  if (args.withInput) {
    return html`
      <md-theme class="theme-toggle" id="label" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-input
          @label-click=${action("click")}
          .label=${args.label}
          placeholder="placeholder text"
          .secondaryLabel=${args.secondaryLabel}
        >
        </md-input>
      </md-theme>
    `;
  } else {
    return html`
      <md-theme class="theme-toggle" id="input" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-label htmlFor="#">${args.label}</md-label>
      </md-theme>
    `;
  }
};

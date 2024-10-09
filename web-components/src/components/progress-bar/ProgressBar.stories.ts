/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/progress-bar/ProgressBar";
import { ThemeNameValues } from "@/components/theme/Theme";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";

export const ProgressBar = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="progress-bar" ?darkTheme=${args.darkTheme} theme=${args.theme}>
      <md-progress-bar
        .value=${args.value}
        .type=${args.type}
        label="${args.label}"
        .color=${args.color}
        ?dynamic=${args.dynamic}
        .displayFormat=${args.format}
      >
      </md-progress-bar>
    </md-theme>
  `;
};

export default {
  title: "Components/Progress Bar",
  component: "md-progress-bar",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    label: { control: "text", defaultValue: "Test Progress Bar" },
    color: { control: "text", defaultValue: "blue" },
    dynamic: { control: "boolean", defaultValue: false },
    format: { control: "select", options: ["none", "percentage", "fraction"], defaultValue: "none" },
    type: { control: "select", options: ["determinate", "indeterminate"], defaultValue: "determinate" },
    value: { control: "number", defaultValue: 25 }
  },
  parameters: {
    a11y: {
      element: "md-modal"
    }
  }
};

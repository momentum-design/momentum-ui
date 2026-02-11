/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/progress-bar/ProgressBar";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const render = (args: Args) => {
  return html`
    <md-progress-bar
      .value=${args.value}
      .type=${args.type}
      label="${args.label}"
      .color=${args.color}
      ?dynamic=${args.dynamic}
      .displayFormat=${args.format}
    >
    </md-progress-bar>
  `;
};

export const ProgressBar: StoryObj = {
  args: {
    label: "Test Progress Bar",
    color: "blue",
    dynamic: false,
    format: "none",
    type: "determinate",
    value: 25
  },
  render: render
};

const meta: Meta = {
  title: "Components/Progress Bar",
  component: "md-progress-bar",
  argTypes: {
    label: { control: "text" },
    color: { control: "text" },
    dynamic: { control: "boolean" },
    format: { control: "select", options: ["none", "percentage", "fraction"] },
    type: { control: "select", options: ["determinate", "indeterminate"] },
    value: { control: "number" }
  },
  parameters: {
    a11y: {
      context: "md-modal"
    }
  }
};

export default meta;

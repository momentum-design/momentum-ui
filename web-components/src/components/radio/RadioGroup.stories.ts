/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/radio/Radio";
import "@/components/radio/RadioGroup";
import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "Components/Radio",
  component: "md-radio",
  argTypes: {
    alignment: { control: { type: "select" }, options: ["horizontal", "vertical"], defaultValue: "vertical" },
    check: { control: "number", defaultValue: 1 },
    disabled: { control: "boolean", defaultValue: false }
  },
  parameters: {
    a11y: {
      element: "md-radiogroup"
    }
  }
};

const render = (args: Args) => {
  return html`
    <md-radiogroup
      group-label="group_process"
      .alignment=${args.alignment as "horizontal" | "vertical"}
      .checked="${args.check}"
    >
      <md-radio slot="radio" value="developing">Developing</md-radio>
      <md-radio slot="radio" value="linting" .disabled=${args.disabled}>Linting</md-radio>
      <md-radio slot="radio" value="testing">Testing</md-radio>
      <md-radio slot="radio" value="building" .disabled=${args.disabled}>Building</md-radio>
    </md-radiogroup>
  `;
};

export const Radio: StoryObj = {
  args: {
    alignment: "vertical"
  },
  render: render
};

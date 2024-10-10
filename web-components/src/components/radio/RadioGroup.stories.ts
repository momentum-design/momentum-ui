/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/radio/Radio";
import "@/components/radio/RadioGroup";
import { ThemeNameValues } from "@/components/theme/Theme";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";

export default {
  title: "Components/Radio",
  component: "md-radio",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    alignment: { control: { type: "select", options: ["horizontal", "vertical"] }, defaultValue: "horizontal" },
    check: { control: "number", defaultValue: 1 },
    disabled: { control: "boolean", defaultValue: false }
  },
  parameters: {
    a11y: {
      element: "md-radiogroup"
    }
  }
};

export const Radio = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="radio" ?darkTheme=${args.darkTheme} theme=${args.theme}>
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
    </md-theme>
  `;
};

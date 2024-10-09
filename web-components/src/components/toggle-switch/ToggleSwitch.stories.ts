/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ThemeNameValues } from "@/components/theme/Theme";
import "@/components/toggle-switch/ToggleSwitch";
import { alignLabel } from "@/components/toggle-switch/ToggleSwitch";
import { Args, Meta } from "@storybook/web-components";
import { html } from "lit-element";

export const ToggleSwitch = (args: Args) => html`
  <md-theme class="theme-toggle" id="toggle" ?darkTheme=${args.darkTheme} theme=${args.theme}>
    <md-toggle-switch
      htmlId="toggleSwitch"
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      .smaller=${args.smaller}
      .alignLabel=${args.align}
    >
      Label Toggle Switch
    </md-toggle-switch>
  </md-theme>
`;

const meta: Meta = {
  title: "Components/Toggle Switch",
  component: "md-toggle-switch",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" },
    toggleSwitchClassMap: { table: { disable: true } },
    autofocus: { table: { disable: true } },
    align: { control: { type: "select", options: alignLabel }, defaultValue: "right" }
  },
  parameters: {
    a11y: {
      element: "md-toggle-switch"
    }
  }
};

export default meta;

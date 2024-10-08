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
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-element";

export const render = (args: Args) => html`
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

export const Primary: StoryObj = {
  args: {
    align: "right"
  }
};

const meta: Meta = {
  title: "Internal References/Color Table",
  component: "color-table",
  render: render,
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues } },
    darkTheme: { control: "boolean" },
    toggleSwitchClassMap: { table: { disable: true } },
    autofocus: { table: { disable: true } },
    align: { control: { type: "select", options: alignLabel } }
  },
  parameters: {
    a11y: {
      element: "md-toggle-switch"
    }
  }
};

export default meta;

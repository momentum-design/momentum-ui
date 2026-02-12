/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/toggle-switch/ToggleSwitch";
import { alignLabel } from "@/components/toggle-switch/ToggleSwitch";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const render = (args: Args) => html`
  <md-toggle-switch
    htmlId="toggleSwitch"
    ?checked=${args.checked}
    ?disabled=${args.disabled}
    .smaller=${args.smaller}
    .alignLabel=${args.align}
  >
    Label Toggle Switch
  </md-toggle-switch>
`;

export const ToggleSwitch: StoryObj = {
  args: {
    align: "right"
  },
  render: render
};

const meta: Meta = {
  title: "Components/Toggle Switch",
  component: "md-toggle-switch",
  argTypes: {
    toggleSwitchClassMap: { table: { disable: true } },
    autofocus: { table: { disable: true } },
    align: { control: { type: "select" }, options: alignLabel, defaultValue: "right" }
  },
  parameters: {
    a11y: {
      context: "md-toggle-switch"
    }
  }
};

export default meta;

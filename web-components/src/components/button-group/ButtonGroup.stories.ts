/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button-group/ButtonGroup";
import "@/components/icon/Icon";
import { ThemeNameValues } from "@/components/theme/Theme";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-element";

const render = (args: Args) => html`
  <md-theme class="theme-toggle" ?darkTheme=${args.darkTheme} theme=${args.theme}>
    <md-button-group ?disabled=${args.disabled}>
      <button slot="button" type="button">
        <md-icon name="table-bold" size="16" iconSet="momentumDesign"></md-icon>
      </button>
      <button slot="button" type="button">
        <md-icon name="analysis-bold" size="16" iconSet="momentumDesign"></md-icon>
      </button>
      <button slot="button" type="button">Option A</button>
      <button slot="button" type="button">Option B</button>
    </md-button-group>
  </md-theme>
`;

export const ButtonGroup: StoryObj = {
  args: {
    theme: "lumos",
    darkTheme: false,
    disabled: false
  },
  render: render
};

const meta: Meta = {
  title: "Components/Button Group",
  component: "md-button-group",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" }
  },
  parameters: {
    a11y: {
      element: "md-button-group"
    }
  }
};

export default meta;

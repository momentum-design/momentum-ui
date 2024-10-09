/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ThemeNameValues } from "@/components/theme/Theme";
import "@/internal-components/color-table/ColorTable";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-element";

const render = (args: Args) => html`
  <md-theme class="theme-toggle" id="color-table" ?darkTheme=${args.darkTheme} theme=${args.theme}>
    <color-table></color-table>
  </md-theme>
`;

export const ColorTable: StoryObj = {
  args: {},
  render: render
};

const meta: Meta = {
  title: "Internal References/Color Table",
  component: "color-table",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" }
  },
  parameters: {
    a11y: {
      element: "color-table"
    }
  }
};

export default meta;

/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/theme/Theme";
import { ThemeNameValues } from "@/components/theme/Theme";
import "@/components/tooltip/Tooltip";
import { tooltipPlacement } from "@/components/tooltip/Tooltip";
import { action } from "@storybook/addon-actions";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-element";

const render = (args: Args) => html`
  <md-theme class="theme-toggle" id="tooltip" ?darkTheme=${args.darkTheme} theme=${args.theme}>
    <md-tooltip
      message=${args.message}
      placement=${args.placement}
      @tooltip-create=${action("show")}
      @tooltip-destroy=${action("hide")}
      ?opened=${args.opened}
    >
      <md-button variant="secondary">Test Button</md-button>
    </md-tooltip>
  </md-theme>
`;

export const Primary: StoryObj = {
  args: {
    theme: "lumos",
    darkTheme: false,
    message: "Test tooltip",
    placement: "right"
  }
};

const meta: Meta = {
  title: "Components/Tooltip",
  component: "md-tooltip",
  render,
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" },
    reference: { table: { disable: true } },
    popper: { table: { disable: true } },
    placement: { control: { type: "select", options: tooltipPlacement } }
  },
  parameters: {
    a11y: {
      element: "md-tooltip"
    }
  }
};

export default meta;

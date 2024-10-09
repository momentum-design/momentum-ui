/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/grabber/Grabber";
import "@/components/theme/Theme";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-element";

const render = (args: Args) => html`
  <md-theme class="theme-toggle" ?darkTheme=${args.darkTheme} theme=${args.theme}>
    <md-grabber
      @grabber-toggled=${action("grabber-toggled")}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      label=${args.label}
      checkedLabel=${args.checkedLabel}
      alignment=${args.alignment}
      ?visible=${args.visible}
    ></md-grabber>
  </md-theme>
`;

export const Grabber: StoryObj = {
  args: {
    theme: "lumos",
    darkTheme: false,
    visible: true,
    checked: false,
    disabled: false,
    alignment: "leading",
    checkedLabel: "Collapse",
    label: "Expand"
  },
  render: render
};

const meta: Meta = {
  title: "Components/Grabber",
  component: "md-grabber",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" },
    checked: { control: "boolean" },
    visible: { control: "boolean" },
    alignment: { control: { type: "select", options: ["leading", "trailing", "top", "bottom"] } }
  },
  parameters: {
    a11y: {
      element: "md-grabber"
    }
  }
};

export default meta;

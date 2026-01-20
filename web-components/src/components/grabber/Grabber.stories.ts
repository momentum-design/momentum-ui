/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/grabber/Grabber";
import { action } from "storybook/actions";
import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const render = (args: Args) => html`
  <md-grabber
    @grabber-toggled=${action("grabber-toggled")}
    ?checked=${args.checked}
    ?disabled=${args.disabled}
    label=${args.label}
    checkedLabel=${args.checkedLabel}
    alignment=${args.alignment}
    ?visible=${args.visible}
    ?shadow=${args.shadow}
  ></md-grabber>
`;

export const Grabber: StoryObj = {
  args: {
    visible: true,
    checked: false,
    disabled: false,
    alignment: "leading",
    checkedLabel: "Collapse",
    label: "Expand",
    shadow: false
  },
  render: render
};

const meta: Meta = {
  title: "Components/Grabber",
  component: "md-grabber",
  argTypes: {
    checked: { control: "boolean" },
    visible: { control: "boolean" },
    alignment: { control: { type: "select" }, options: ["leading", "trailing", "top", "bottom"] }
  },
  parameters: {
    a11y: {
      element: "md-grabber"
    }
  }
};

export default meta;

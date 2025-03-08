/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/internal-components/color-table/ColorTable";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const render = (_args: Args) => html` <color-table></color-table> `;

export const ColorTable: StoryObj = {
  args: {},
  render: render
};

const meta: Meta = {
  title: "Internal References/Color Table",
  component: "color-table",
  argTypes: {},
  parameters: {
    a11y: {
      element: "color-table"
    }
  }
};

export default meta;

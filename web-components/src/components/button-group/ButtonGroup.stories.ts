/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button-group/ButtonGroup";
import "@/components/icon/Icon";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const render = (args: Args) => html`
  <md-button-group ?disabled=${args.disabled} ?newMomentum=${args.newMomentum}>
    <button slot="button" type="button">
      <md-icon name="table-bold" size="16" iconSet="momentumDesign"></md-icon>
    </button>
    <button slot="button" type="button">
      <md-icon name="analysis-bold" size="16" iconSet="momentumDesign"></md-icon>
    </button>
    <button slot="button" type="button">Option A</button>
    <button slot="button" type="button">Option B</button>
  </md-button-group>
`;

export const ButtonGroup: StoryObj = {
  args: {
    disabled: false
  },
  render: render
};

const meta: Meta = {
  title: "Components/Button Group",
  component: "md-button-group",
  argTypes: {},
  parameters: {
    a11y: {
      context: "md-button-group"
    }
  }
};

export default meta;

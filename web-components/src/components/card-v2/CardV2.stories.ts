/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { CardState } from "@/components/card-v2/CardV2";
import { action } from "@storybook/addon-actions";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const render = (args: Args) => {
  return html`
    <md-card-v2
      state=${args.state}
      identifier=${args.identifier}
      header=${args.header}
      data=${args.data}
      createdTime=${args.createdTime}
      .active=${args.active}
      info=${args.info}
      .expandable=${args.expandable}
      @expand-card-toggled=${(e: CustomEvent<{ id: string; active: boolean }>) => {
        action("expand-card-toggled")(e.detail);
      }}
    >
    </md-card-v2>
  `;
};

export const CardV2: StoryObj = {
  args: {
    state: CardState.DEFAULT,
    identifier: "1234567890",
    header: "Test Title",
    info: "Test Info",
    data: "00:12:11",
    createdTime: Date.now() - 60000,
    active: false,
    expandable: true
  },
  render: render
};

const meta: Meta = {
  title: "Components/CardV2",
  component: "md-card-v2",
  argTypes: { state: { control: { type: "select" }, options: Object.values(CardState) } },
  parameters: { a11y: { element: "md-card-v2" } }
};

export default meta;

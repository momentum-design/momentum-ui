/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/list/List";
import "@/components/list/ListItem";
import { action } from "storybook/actions";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const alignmentOptions = ["vertical", "horizontal"];

const render = (args: Args) => {
  return html`
    <md-list
      @list-item-change=${action("change")}
      label="Transuranium elements"
      .activated="${args.selected}"
      .alignment=${args.alignment as "horizontal" | "vertical"}
    >
      <md-list-item shape=${args.shape} slot="list-item">Neptunium</md-list-item>
      <md-list-item shape=${args.shape} slot="list-item" ?disabled=${args.disabled}>Plutonium</md-list-item>
      <md-list-item shape=${args.shape} slot="list-item">Americium</md-list-item>
      <md-list-item shape=${args.shape} slot="list-item" ?disabled=${args.disabled}>Curium</md-list-item>
      <md-list-item shape=${args.shape} slot="list-item">Berkelium</md-list-item>
      <md-list-item shape=${args.shape} slot="list-item">Californium</md-list-item>
    </md-list>
  `;
};

export const List: StoryObj = {
  args: {
    alignment: "vertical",
    shape: "rounded",
    disabled: false,
    selected: 2
  },
  render: render
};

const meta: Meta = {
  title: "Components/List",
  component: "md-list",
  argTypes: {
    slotElement: { table: { disable: true } },
    listItemSlot: { table: { disable: true } },
    activated: { table: { disable: true } },
    alignment: { control: { type: "select" }, options: alignmentOptions },
    shape: { control: { type: "select" }, options: ["pill", "rounded"] }
  },
  parameters: { a11y: { context: "md-list" } }
};

export default meta;

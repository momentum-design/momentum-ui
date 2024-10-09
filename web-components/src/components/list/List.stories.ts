/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/list/List";
import "@/components/list/ListItem";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";

const options = {
  Vertical: "vertical",
  Horizontal: "horizontal"
};

export const List = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="list" ?darkTheme=${args.darkTheme} theme=${args.theme}>
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
    </md-theme>
  `;
};

export default {
  title: "Components/List",
  component: "md-list",
  argTypes: {
    slotElement: { table: { disable: true } },
    listItemSlot: { table: { disable: true } },
    activated: { table: { disable: true } },
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    alignment: { control: { type: "select", options }, defaultValue: "vertical" },
    shape: { control: { type: "select", options: ["pill", "rounded"] }, defaultValue: "rounded" },
    disabled: { control: "boolean", defaultValue: false },
    selected: { control: "number", defaultValue: 2 }
  },
  parameters: {
    a11y: {
      element: "md-list"
    }
  }
};

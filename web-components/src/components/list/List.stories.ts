/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/list/List";
import "@/components/list/ListItem";
import "@/components/theme/Theme";
import { ThemeNameValues } from "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { action } from "@storybook/addon-actions";
import { boolean, number, select, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Components/List",
  component: "md-list",
  decorators: [withKnobs, withA11y],
  argTypes: {
    slotElement: { table: { disable: true } },
    listItemSlot: { table: { disable: true } },
    activated: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-list"
    }
  }
};

const options = {
  Vertical: "vertical",
  Horizontal: "horizontal"
};

export const List = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const disabled = boolean("Disabled", false);
  const selected = number("Preselected", 2);
  const alignment = select("Orientation", options, "vertical");
  const shape = select("Shape", ["pill", "rounded"], "rounded");

  return html`
    <md-theme class="theme-toggle" id="list" ?darkTheme=${darkTheme} ?lumos=${lumos} theme=${theme}>
      <md-list
        @list-item-change=${action("change")}
        label="Transuranium elements"
        .activated="${selected}"
        .alignment=${alignment as "horizontal" | "vertical"}
      >
        <md-list-item shape=${shape} slot="list-item">Neptunium</md-list-item>
        <md-list-item shape=${shape} slot="list-item" ?disabled=${disabled}>Plutonium</md-list-item>
        <md-list-item shape=${shape} slot="list-item">Americium</md-list-item>
        <md-list-item shape=${shape} slot="list-item" ?disabled=${disabled}>Curium</md-list-item>
        <md-list-item shape=${shape} slot="list-item">Berkelium</md-list-item>
        <md-list-item shape=${shape} slot="list-item">Californium</md-list-item>
      </md-list>
    </md-theme>
  `;
};

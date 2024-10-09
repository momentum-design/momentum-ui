/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/favorite/Favorite";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";
import mdx from "./Favorite.mdx";

export default {
  title: "Components/Favorite",
  component: "md-favorite",
  argTypes: {
    toggleSwitchClassMap: { table: { disable: true } },
    autofocus: { table: { disable: true } },
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" },
    value: { control: "text", defaultValue: "Select favorite" }
  },
  parameters: {
    a11y: {
      element: "md-favorite"
    },
    docs: {
      page: mdx
    }
  }
};

export const Favorite = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="toggle" ?darkTheme=${args.darkTheme} theme=${args.theme}>
      <md-favorite
        @favorite-toggle=${action("favorite-toggle")}
        id="favorite-switch"
        ?checked=${args.active}
        ?disabled=${args.disabled}
        value=${args.value}
      ></md-favorite>
    </md-theme>
  `;
};

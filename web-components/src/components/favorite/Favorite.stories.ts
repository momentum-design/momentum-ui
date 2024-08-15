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
import { boolean, select, text } from "@storybook/addon-knobs";
import { html } from "lit-element";
import mdx from "./Favorite.mdx";

export default {
  title: "Components/Favorite",
  component: "md-favorite",
  argTypes: {
    toggleSwitchClassMap: { table: { disable: true } },
    autofocus: { table: { disable: true } }
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

export const Favorite = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const active = boolean("Checked", false);
  const disabled = boolean("Disabled", false);
  const value = text("Value", "Select favorite");

  return html`
    <md-theme class="theme-toggle" id="toggle" ?darkTheme=${darkTheme} theme=${theme}>
      <md-favorite
        @favorite-toggle=${action("favorite-toggle")}
        id="favorite-switch"
        ?checked=${active}
        ?disabled=${disabled}
        value=${value}
      ></md-favorite>
    </md-theme>
  `;
};

/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ThemeNameValues } from "@/components/theme/Theme";
import "@/internal-components/color-table/ColorTable";
import { boolean, select } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Internal References/Color Table",
  component: "color-table",
  parameters: {
    a11y: {
      element: "color-table"
    }
  }
};

export const ColorTable = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");

  return html`
    <md-theme class="theme-toggle" id="color-table" ?darkTheme=${darkTheme} theme=${theme}>
      <color-table></color-table>
    </md-theme>
  `;
};

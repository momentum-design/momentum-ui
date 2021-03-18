/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "@/components/theme/Theme";
import "@/internal-components/color-table/ColorTable";

export default {
  title: "Internal References/Color Table",
  component: "color-table",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "color-table"
    }
  }
};

export const ColorTable = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);

  return html`
  <md-theme class="theme-toggle" id="color-table" ?darkTheme=${darkTheme} ?lumos=${lumos}>
    <color-table></color-table>
  </md-theme>
  `;
};

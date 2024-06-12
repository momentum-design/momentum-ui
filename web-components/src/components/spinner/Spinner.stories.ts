/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import { number, select, boolean, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "@/components/spinner/Spinner";
import "@/components/theme/Theme";
import { ThemeNameValues } from "@/components/theme/Theme";

export default {
  title: "Components/Spinner",
  component: "md-spinner",
  decorators: [withKnobs, withA11y],
  argTypes: {
    spinnerStyleMap: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-spinner"
    }
  }
};

export const Spinner = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const size = number("Size", 20);

  return html`
    <md-theme class="theme-toggle" id="spinner" ?darkTheme=${darkTheme} ?lumos=${lumos} theme=${theme}>
      <md-spinner .size="${size}"></md-spinner>
    </md-theme>
  `;
}

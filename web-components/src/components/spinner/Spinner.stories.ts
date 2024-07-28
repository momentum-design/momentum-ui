/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/spinner/Spinner";
import { ThemeNameValues } from "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, number, select, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

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
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const size = number("Size", 20);

  return html`
    <md-theme class="theme-toggle" id="spinner" ?darkTheme=${darkTheme} theme=${theme}>
      <md-spinner .size="${size}"></md-spinner>
    </md-theme>
  `;
};

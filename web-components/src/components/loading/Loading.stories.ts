/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/loading/Loading";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { select, boolean, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { ThemeNameValues } from "@/components/theme/Theme";

export default {
  title: "Components/Loading",
  component: "md-loading",
  decorators: [withKnobs, withA11y],
  argTypes: {
    loadingClassMap: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-loading"
    }
  }
};

const options = {
    Small: "small",
    Middle: "middle",
    Large: "large",
    None: ""
  };

export const Loading = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const size = select("Size", options, "small");

  return html`
    <md-theme class="theme-toggle" id="loading" ?darkTheme=${darkTheme} ?lumos=${lumos} theme=${theme}>
      <md-loading .size=${size as any}></md-loading>
    </md-theme>   
  `;
};

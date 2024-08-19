/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/loading/Loading";
import { ThemeNameValues } from "@/components/theme/Theme";
import { boolean, select } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Components/Loading",
  component: "md-loading",
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
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const size = select("Size", options, "small");

  return html`
    <md-theme class="theme-toggle" id="loading" ?darkTheme=${darkTheme} theme=${theme}>
      <md-loading .size=${size as any}></md-loading>
    </md-theme>
  `;
};

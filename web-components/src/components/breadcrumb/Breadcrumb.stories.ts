/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/breadcrumb/Breadcrumb";
import { ThemeNameValues } from "@/components/theme/Theme";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Components/Breadcrumb",
  component: "md-breadcrumb",
  decorators: [withKnobs],
  parameters: {
    a11y: {
      element: "md-breadcrumb"
    }
  }
};

const breadCrumb = [
  {
    link: "/one",
    label: "One"
  },
  {
    link: "/two",
    label: "Two"
  },
  {
    link: "/three",
    label: "Three"
  },
  {
    link: "/four",
    label: "Four"
  }
];

export const Breadcrumb = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");

  return html`
    <md-theme class="theme-toggle" id="breadcrumb" ?darkTheme=${darkTheme} theme=${theme}>
      <md-breadcrumb .navCrumbs="${breadCrumb}"></md-breadcrumb>
    </md-theme>
  `;
};

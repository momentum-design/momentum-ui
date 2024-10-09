/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/loading/Loading";
import { ThemeNameValues } from "@/components/theme/Theme";
import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit-element";

const options = {
  Small: "small",
  Middle: "middle",
  Large: "large",
  None: ""
};

export default {
  title: "Components/Loading",
  component: "md-loading",
  argTypes: {
    loadingClassMap: { table: { disable: true } },
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    size: { control: { type: "select", options }, defaultValue: "middle" }
  },
  parameters: {
    a11y: {
      element: "md-loading"
    }
  }
};

export const Loading: StoryObj = {
  args: {},
  render: (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="loading" ?darkTheme=${args.darkTheme} theme=${args.theme}>
      <md-loading size=${args.size}></md-loading>
    </md-theme>
  `;
  }
};

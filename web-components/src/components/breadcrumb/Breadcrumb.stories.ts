/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/breadcrumb/Breadcrumb";
import { ThemeNameValues } from "@/components/theme/Theme";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-element";

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

const render = (args: Args) => html`
  <md-theme class="theme-toggle" id="breadcrumb" ?darkTheme=${args.darkTheme} theme=${args.theme}>
    <md-breadcrumb .navCrumbs="${breadCrumb}"></md-breadcrumb>
  </md-theme>
`;

export const Primary: StoryObj = {
  args: {
    theme: "lumos",
    darkTheme: false
  }
};

const meta: Meta = {
  title: "Components/Breadcrumb",
  component: "md-breadcrumb",
  render,
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" }
  },
  parameters: {
    a11y: {
      element: "md-breadcrumb"
    }
  },
  args: Primary.args
};

export default meta;

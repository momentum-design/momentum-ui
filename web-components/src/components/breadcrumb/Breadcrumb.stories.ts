/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/breadcrumb/Breadcrumb";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

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

const render = (_args: Args) => html` <md-breadcrumb .navCrumbs="${breadCrumb}"></md-breadcrumb> `;

export const Breadcrumb: StoryObj = {
  args: {},
  render: render
};

const meta: Meta = {
  title: "Components/Breadcrumb",
  component: "md-breadcrumb",
  argTypes: {},
  parameters: {
    a11y: {
      context: "md-breadcrumb"
    }
  }
};

export default meta;

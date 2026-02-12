/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/loading/Loading";
import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const sizeOptions = ["small", "middle", "large", ""];

const meta: Meta = {
  title: "Components/Loading",
  component: "md-loading",
  argTypes: {
    loadingClassMap: { table: { disable: true } },
    size: { control: "select", options: sizeOptions }
  },
  parameters: {
    a11y: {
      context: "md-loading"
    }
  }
};

export const Loading: StoryObj = {
  args: {
    size: "middle"
  },
  render: (args: Args) => {
    return html` <md-loading size=${args.size}></md-loading> `;
  }
};

export default meta;

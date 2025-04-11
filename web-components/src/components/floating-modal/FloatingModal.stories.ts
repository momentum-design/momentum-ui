/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/floating-modal/FloatingModal";
import "@/components/radio/Radio";
import "@/components/radio/RadioGroup";
import { Args } from "@storybook/web-components";
import { html } from "lit";
import mdx from "./Floating.mdx";

export default {
  title: "Components/Floating Modal",
  component: "md-floating-modal",
  argTypes: {
    fixfull: {
      description: "fix modal position to the screen, not parent div"
    },
    onCornerClick: { table: { disable: true } },
    draggingWindow: { table: { disable: true } },
    draggingCorner: { table: { disable: true } },
    onCornerMove: { table: { disable: true } },
    resizeStyleMap: { table: { disable: true } },
    fullScreen: { table: { disable: true } },
    show: { control: "boolean", defaultValue: true },
    full: { control: "boolean", defaultValue: false },
    fixed: { control: "boolean", defaultValue: false },
    aspectRatio: { control: "boolean", defaultValue: false },
    heading: { control: "text", defaultValue: "Test Heading" },
    label: { control: "text", defaultValue: "Test label" },
    maximizable: { control: "boolean", defaultValue: false },
    resizable: { control: "boolean", defaultValue: false },
    minimizable: { control: "boolean", defaultValue: false },
  },
  parameters: {
    a11y: {
      element: "md-floating-modal"
    },
    docs: {
      page: mdx,
      description: {
        component: "some component description"
      }
    }
  }
};

export const FloatingModal = (args: Args) => {
  return html`
    <md-floating-modal
      ?show=${args.show}
      ?full-screen=${args.full}
      ?fixed-strategy=${args.fixed}
      ?aspect-ratio=${args.aspectRatio}
      heading=${args.heading}
      label=${args.label}
      ?maximizable=${args.maximizable}
      ?resizable=${args.resizable}
      ?minimizable=${args.minimizable}
    >
      <md-radiogroup group-label="group_process">
        <md-radio slot="radio" value="Option 1">Option 1</md-radio>
        <md-radio slot="radio" value="Option 2">Option 2</md-radio>
        <md-radio slot="radio" value="Option 3">Option 3</md-radio>
        <md-radio slot="radio" value="Option 4">Option 4</md-radio>
      </md-radiogroup>
    </md-floating-modal>
  `;
};

/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/slider/Slider";
import { action } from "storybook/actions";
import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit";

export default {
  title: "Components/Slider",
  component: "md-slider",
  argTypes: {
    sliderSelectionStyleMap: { table: { disable: true } },
    sliderPointerStyleMap: { table: { disable: true } },
    disabled: { control: "boolean", defaultValue: false },
    step: { control: "number", defaultValue: 1 },
    min: { control: "number", defaultValue: 0 },
    max: { control: "number", defaultValue: 10 },
    now: { control: "number", defaultValue: 4 },
    nopointer: { control: "boolean", defaultValue: false },
    hideValue: { control: "boolean", defaultValue: false }
  },
  parameters: {
    a11y: {
      context: "md-slider"
    }
  }
};

const render = (args: Args) => {
  return html`
    <md-slider
      @slider-change=${action("change")}
      @slider-changing=${action("changing")}
      .disabled=${args.disabled}
      .min=${args.min}
      .max=${args.max}
      .step=${args.step}
      .now=${args.now}
      ?no-pointer=${args.nopointer}
      ?hide-value=${args.hideValue}
    ></md-slider>
  `;
};

export const Slider: StoryObj = {
  args: {
    disabled: false,
    step: 1,
    min: 0,
    max: 10,
    now: 4,
    nopointer: false,
    hideValue: false
  },
  render: render
};

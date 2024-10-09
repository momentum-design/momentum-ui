/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/slider/Slider";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";

export default {
  title: "Components/Slider",
  component: "md-slider",
  argTypes: {
    sliderSelectionStyleMap: { table: { disable: true } },
    sliderPointerStyleMap: { table: { disable: true } },
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
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
      element: "md-slider"
    }
  }
};

export const Slider = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="slider" ?darkTheme=${args.darkTheme} theme=${args.theme}>
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
    </md-theme>
  `;
};

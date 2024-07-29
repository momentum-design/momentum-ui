/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/slider/Slider";
import { ThemeNameValues } from "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { action } from "@storybook/addon-actions";
import { boolean, number, select, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Components/Slider",
  component: "md-slider",
  decorators: [withKnobs, withA11y],
  argTypes: {
    sliderSelectionStyleMap: { table: { disable: true } },
    sliderPointerStyleMap: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-slider"
    }
  }
};

export const Slider = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const disabled = boolean("Disabled", false);
  const step = number("step", 1);
  const min = number("min", 0);
  const max = number("max", 10);
  const now = number("now", 4);
  const nopointer = boolean("No Pointer", false);
  const hideValue = boolean("Hide Value", false);

  return html`
    <md-theme class="theme-toggle" id="slider" ?darkTheme=${darkTheme} theme=${theme}>
      <md-slider
        @slider-change=${action("change")}
        .disabled=${disabled}
        .min=${min}
        .max=${max}
        .step=${step}
        .now=${now}
        ?no-pointer=${nopointer}
        ?hide-value=${hideValue}
      ></md-slider>
    </md-theme>
  `;
};

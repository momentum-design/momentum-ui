/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/progress-bar/ProgressBar";
import { ThemeNameValues } from "@/components/theme/Theme";
import { BarFormat, BarType } from "@/utils/enums";
import { boolean, number, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Components/Progress Bar",
  component: "md-progress-bar",
  decorators: [withKnobs],
  parameters: {
    a11y: {
      element: "md-modal"
    }
  }
};

export const ProgressBar = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const label = text("Label", "Test Progress Bar");
  const color = text("color", "blue");
  const dynamic = boolean("dynamic", false);
  const format = select("dispalyFormat", BarFormat, "none") as any;
  const type = select("Type", BarType, "determinate") as any;
  const value = number("Value", 25);

  return html`
    <md-theme class="theme-toggle" id="progress-bar" ?darkTheme=${darkTheme} theme=${theme}>
      <md-progress-bar
        .value=${value}
        .type=${type}
        label="${label}"
        .color=${color}
        ?dynamic=${dynamic}
        .displayFormat=${format}
      >
      </md-progress-bar>
    </md-theme>
  `;
};

/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/radio/Radio";
import "@/components/radio/RadioGroup";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { select, boolean, text, withKnobs, number } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { ThemeNameValues } from "@/components/theme/Theme";

export default {
  title: "Components/Radio",
  component: "md-radio",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-radiogroup"
    }
  }
};

export const Radio = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const options = { Vertical: "vertical", Horizontal: "horizontal"};
  const alignment = select("Orientation", options, "horizontal");
  const check = number("Precheck", 1);
  const disabled = boolean("Disabled", false);

  return html`
    <md-theme class="theme-toggle" id="radio" ?darkTheme=${darkTheme} ?lumos=${lumos} theme=${theme}>
      <md-radiogroup group-label="group_process" .alignment=${alignment as any} .checked="${check}">
        <md-radio slot="radio" value="developing">Developing</md-radio>
        <md-radio slot="radio" value="linting" .disabled=${disabled}>Linting</md-radio>
        <md-radio slot="radio" value="testing">Testing</md-radio>
        <md-radio slot="radio" value="building" .disabled=${disabled}>Building</md-radio>
      </md-radiogroup>
    </md-theme>
  `;
};

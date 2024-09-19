/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/radio/Radio";
import "@/components/radio/RadioGroup";
import { ThemeNameValues } from "@/components/theme/Theme";
import { boolean, number, select } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Components/Radio",
  component: "md-radio",
  parameters: {
    a11y: {
      element: "md-radiogroup"
    }
  }
};

export const Radio = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const options = { Vertical: "vertical", Horizontal: "horizontal" };
  const alignment = select("Orientation", options, "horizontal");
  const check = number("Precheck", 1);
  const disabled = boolean("Disabled", false);

  return html`
    <md-theme class="theme-toggle" id="radio" ?darkTheme=${darkTheme} theme=${theme}>
      <md-radiogroup
        group-label="group_process"
        .alignment=${alignment as "horizontal" | "vertical"}
        .checked="${check}"
      >
        <md-radio slot="radio" value="developing">Developing</md-radio>
        <md-radio slot="radio" value="linting" .disabled=${disabled}>Linting</md-radio>
        <md-radio slot="radio" value="testing">Testing</md-radio>
        <md-radio slot="radio" value="building" .disabled=${disabled}>Building</md-radio>
      </md-radiogroup>
    </md-theme>
  `;
};

/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/toggle-switch/ToggleSwitch";
import "@/components/theme/Theme";
import { alignLabel } from "@/components/toggle-switch/ToggleSwitch";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, withKnobs, select } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Components/Toggle Switch",
  component: "md-toggle-switch",
  decorators: [withKnobs, withA11y],
  argTypes: {
    toggleSwitchClassMap: { table: { disable: true } },
    autofocus: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-toggle-switch"
    }
  }
};

export const ToggleSwitch = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const checked = boolean("Checked", false);
  const disabled = boolean("Disabled", false);
  const smaller = boolean("Smaller", false);
  const align = select("Color", alignLabel, "right");

  return html`
  <md-theme class="theme-toggle" id="toggle" ?darkTheme=${darkTheme} ?lumos=${lumos}>
    <md-toggle-switch htmlId="toggleSwitch" ?checked=${checked} ?disabled=${disabled} .smaller=${smaller} ?align=${align}> Label Toggle Switch </md-toggle-switch>
  </md-theme>
  `;
};


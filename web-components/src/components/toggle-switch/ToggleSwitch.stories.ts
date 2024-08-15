/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { ThemeNameValues } from "@/components/theme/Theme";
import "@/components/toggle-switch/ToggleSwitch";
import { alignLabel } from "@/components/toggle-switch/ToggleSwitch";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Components/Toggle Switch",
  component: "md-toggle-switch",
  decorators: [withKnobs],
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
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const checked = boolean("Checked", false);
  const disabled = boolean("Disabled", false);
  const smaller = boolean("Smaller", false);
  const align = select("Align Label", alignLabel, "right");

  return html`
    <md-theme class="theme-toggle" id="toggle" ?darkTheme=${darkTheme} theme=${theme}>
      <md-toggle-switch
        htmlId="toggleSwitch"
        ?checked=${checked}
        ?disabled=${disabled}
        .smaller=${smaller}
        ?alignLabel=${align}
      >
        Label Toggle Switch
      </md-toggle-switch>
    </md-theme>
  `;
};

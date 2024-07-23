/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/grabber/Grabber";
import "@/components/theme/Theme";
import { ThemeNameValues } from "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { action } from "@storybook/addon-actions";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import mdx from "./Grabber.mdx";

export default {
  title: "Components/Grabber",
  component: "md-grabber",
  decorators: [withKnobs, withA11y],
  argTypes: {
    toggleSwitchClassMap: { table: { disable: true } },
    autofocus: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-grabber"
    },
    docs: {
      page: mdx
    }
  }
};

export const Grabber = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const active = boolean("Checked", false);
  const disabled = boolean("Disabled", false);
  const label = text("Label", "Expand");
  const checkedLabel = text("Label", "Collapse");
  const alignment = select("Alignment", ["leading", "trailing", "top", "bottom"], "leading");

  return html`
    <md-theme class="theme-toggle" id="toggle" ?darkTheme=${darkTheme} ?lumos=${lumos} theme=${theme}>
      <md-grabber
        @grabber-toggled=${action("grabber-toggled")}
        ?checked=${active}
        ?disabled=${disabled}
        label=${label}
        checkedLabel=${checkedLabel}
        alignment=${alignment}
      ></md-grabber>
    </md-theme>
  `;
};

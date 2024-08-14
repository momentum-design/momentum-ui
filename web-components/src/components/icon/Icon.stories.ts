/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/icon/Icon";
import { ThemeNameValues } from "@/components/theme/Theme";
import iconNames from "@momentum-ui/icons/data/momentumUiIconsNames.json";
import { withA11y } from "@storybook/addon-a11y";
import { action } from "@storybook/addon-actions";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { iconSize, iconType } from "./Icon"; // Keep type import as a relative path

export default {
  title: "Components/Icon",
  component: "md-icon",
  decorators: [withKnobs, withA11y],
  argTypes: {
    iconClassMap: { table: { disable: true } },
    iconStyleMap: { table: { disable: true } },
    iconFontSize: { table: { disable: true } },
    iconColor: { table: { disable: true } },
    iconName: { table: { disable: true } },
    consoleHandler: { table: { disable: true } },
    buttonClassMap: { table: { disable: true } },
    isComboBoxIcon: { table: { disable: true } },
    isActive: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-icon"
    }
  }
};

export const Icon = () => {
  const darkTheme = boolean("Dark Mode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const name = select("Name", iconNames, "arrow-up_16");
  const color = text("Color", "red");
  const momentumDesignIconEnabled = boolean("Design Enabled", true);
  const title = text("Title", "");
  const type = select("Type", iconType, "");
  const size = select("Size", iconSize, "16");
  const sizeOverrided = boolean("Size Override", false);

  return html`
    <md-theme class="theme-toggle" id="icon" ?darkTheme=${darkTheme} theme=${theme}>
      <md-icon
        .name=${`icon-${name}`}
        .title=${title}
        .color=${color}
        .type=${type}
        .size=${String(size)}
        .sizeOverrided=${sizeOverrided}
        ?designEnabled=${momentumDesignIconEnabled}
        @icon-click=${action("dispatchEvent")}
      >
      </md-icon>
    </md-theme>
  `;
};

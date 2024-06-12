/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import iconNames from "@momentum-ui/icons/data/momentumUiIconsNames.json";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "@/components/icon/Icon";
import "@/components/theme/Theme";
import { iconSize, iconType } from "./Icon"; // Keep type import as a relative path
import { action } from '@storybook/addon-actions';
import { ThemeNameValues } from "@/components/theme/Theme";

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
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const name = select("Name", iconNames, "arrow-up_16");
  const color = text("Color", "red");
  const title = text("Title", "");
  const type = select("Type", iconType, "");
  const iconStyle = text("Icon Style", "");
  const size = select("Size", iconSize, "16");
  const sizeOverrided = boolean("Size Override", false);

  return html`
    <md-theme class="theme-toggle" id="icon" ?darkTheme=${darkTheme} ?lumos=${lumos} theme=${theme}>
      <md-icon
        .name=${`icon-${name}`}
        .title=${title}
        .color=${color}
        .iconStyle=${iconStyle}
        .type=${type}
        .size=${size}
        .sizeOverrided=${sizeOverrided}
        @icon-click=${(action('dispatchEvent'))}>
      </md-icon>
    </md-theme>
  `;
}


/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/icon/Icon";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import { boolean, select, text } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { iconSet, iconSize, iconType } from "./Icon"; // Keep type import as a relative path

export default {
  title: "Components/Icon",
  component: "md-icon",
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
  const iconName = text("Icon Name", "accessibility_16");
  const color = text("Color", "var(--wc-success-text-color");
  const theIconSet = select("Icon set", iconSet, iconSet[0]);
  const title = text("Title", "");
  const type = select("Type", iconType, "");
  const size = select("Size", iconSize, "16");
  const sizeOverrided = boolean("Size Override", false);

  return html`
    <md-theme class="theme-toggle" id="icon" ?darkTheme=${darkTheme} theme=${theme}>
      <md-icon
        .name=${iconName}
        .title=${title}
        .color=${color}
        .type=${type}
        .size=${String(size)}
        .sizeOverrided=${sizeOverrided}
        .iconSet=${theIconSet}
        @icon-click=${action("dispatchEvent")}
      >
      </md-icon>
    </md-theme>
  `;
};

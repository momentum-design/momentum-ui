/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/badge/Badge";
import "@/components/icon/Icon";
import "@/components/theme/Theme";
import { badgeColor } from "@/utils/enums";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { ThemeNameValues } from "@/components/theme/Theme";

export default {
  title: "Components/Badge",
  component: "md-badge",
  decorators: [withKnobs, withA11y],
  argTypes: {
    renderBgColor: { table: { disable: true } },
    renderTextColor: { table: { disable: true } },
    renderHeight: { table: { disable: true } },
    renderWidth: { table: { disable: true } },
    getStyles: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-badge"
    }
  }
};

export const Badge = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const color = select("Color", badgeColor, "blue");
  const bgColor = text("BG Color Overrides", "");
  const textColor = text("Text Color Override", "");
  const height = text("Height Override", "");
  const width = text("Width Override", "");
  const circle = boolean("Circle", false);
  const small = boolean("Small", false);
  const icon = boolean("With icon", false);
  const disabled = boolean("Disabled", false);

  return html`
    <md-theme class="theme-toggle" id="badge" ?darkTheme=${darkTheme} ?lumos=${lumos} theme=${theme}>
      <md-badge
        .color=${color}
        .bgColor=${bgColor}
        .small=${small}
        .textColor=${textColor}
        .height=${height}
        .width=${width}
        .circle=${circle}
        ?disabled=${disabled}
      >
        ${icon
          ? html`
              <md-icon name="chat-active_16"></md-icon>
            `
          : html`
              Badge ${color}
            `}
      </md-badge>
    </md-theme>
  `;
};

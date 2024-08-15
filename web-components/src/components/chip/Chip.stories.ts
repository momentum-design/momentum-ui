/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/chip/Chip";
import "@/components/icon/Icon";
import { ThemeNameValues } from "@/components/theme/Theme";
import { badgeColor, BarType, iconColorSample, iconSamples } from "@/utils/enums";
import { boolean, number, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";

export default {
  title: "Components/Chip",
  component: "md-chip",
  decorators: [withKnobs],
  parameters: {
    a11y: {
      element: "md-chip"
    }
  }
};

export const Chip = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const color = select("Color", badgeColor, "blue");
  const bgColor = text("BG Color Overrides", "blue");
  const textColor = text("Text Color Override", "white");
  const height = text("Height Override", "");
  const valueText = text("value text", "replace this with long string");
  const small = boolean("Small", false);
  const disabled = boolean("Disabled", false);
  const readonly = boolean("readonly", false);
  const isLoad = boolean("If Loading", false);
  const slot = boolean("Slotted Content", false);
  const iconSet = boolean("Add Icon", false);

  if (isLoad) {
    const options = { range: true, min: 0, max: 100, step: 1 };
    const type = select("load type", BarType, "indeterminate");
    const value = number("loading", 75, options);

    return type === "indeterminate"
      ? html`
          <md-theme class="theme-toggle" id="chip" ?darkTheme=${darkTheme} theme=${theme}>
            <md-chip value="example-chip@cisco.com" indeterminateProgress> </md-chip>
          </md-theme>
        `
      : html`
          <md-theme class="theme-toggle" id="chip" ?darkTheme=${darkTheme} theme=${theme}>
            <md-chip value="example-chip@cisco.com" determinateProgress="${value}"> </md-chip>
          </md-theme>
        `;
  } else if (slot) {
    return html`
      <md-theme class="theme-toggle" id="chip" ?darkTheme=${darkTheme} theme=${theme}>
        <md-chip value="example-chip@cisco.com">
          <md-icon name="icon-alert_16" slot="custom-left-content"></md-icon>
          <md-icon name="icon-alarm_16" slot="custom-right-content"></md-icon>
        </md-chip>
      </md-theme>
    `;
  } else if (iconSet) {
    const icon = select("icon", iconSamples, "");
    const colorIcon = select("icon color", iconColorSample, "");

    return html`
      <md-theme class="theme-toggle" id="chip" ?darkTheme=${darkTheme} theme=${theme}>
        <md-chip value="example-chip@cisco.com" icon="${icon}" iconColor="${colorIcon}"> </md-chip>
      </md-theme>
    `;
  } else {
    return html`
      <md-theme class="theme-toggle" id="chip" ?darkTheme=${darkTheme} theme=${theme}>
        <md-chip
          .color=${color}
          .bgColor=${bgColor}
          .textColor=${textColor}
          .small=${small}
          .height=${height}
          .value="${valueText}"
          .disabled=${disabled}
          ?readonly=${readonly}
        ></md-chip>
      </md-theme>
    `;
  }
};

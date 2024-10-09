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
import { BarType, chipColor, iconColorSample, iconSamples } from "@/utils/enums";
import { Args } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "Components/Chip",
  component: "md-chip",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    color: { control: { type: "select", options: chipColor }, defaultValue: "blue" },
    bgColor: { control: "text", defaultValue: "blue" },
    textColor: { control: "text", defaultValue: "white" },
    height: { control: "text", defaultValue: "" },
    valueText: { control: "text", defaultValue: "replace this with long string" },
    small: { control: "boolean", defaultValue: false },
    disabled: { control: "boolean", defaultValue: false },
    readonly: { control: "boolean", defaultValue: false },
    isLoad: { control: "boolean", defaultValue: false },
    slot: { control: "boolean", defaultValue: false },
    iconSet: { control: "boolean", defaultValue: false },
    type: { control: { type: "select", options: BarType }, defaultValue: "indeterminate" },
    value: { control: "number", defaultValue: 75 },
    icon: { control: { type: "select", options: iconSamples }, defaultValue: "" },
    iconColor: { control: { type: "select", options: iconColorSample }, defaultValue: "" }
  },
  parameters: {
    a11y: {
      element: "md-chip"
    }
  }
};

export const Chip = (args: Args) => {
  if (args.isLoad) {
    return args.type === "indeterminate"
      ? html`
          <md-theme class="theme-toggle" id="chip" ?darkTheme=${args.darkTheme} theme=${args.theme}>
            <md-chip value="example-chip@cisco.com" indeterminateProgress> </md-chip>
          </md-theme>
        `
      : html`
          <md-theme class="theme-toggle" id="chip" ?darkTheme=${args.darkTheme} theme=${args.theme}>
            <md-chip value="example-chip@cisco.com" determinateProgress="${args.value}"> </md-chip>
          </md-theme>
        `;
  } else if (args.slot) {
    return html`
      <md-theme class="theme-toggle" id="chip" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-chip value="example-chip@cisco.com">
          <md-icon name="icon-alert_16" slot="custom-left-content"></md-icon>
          <md-icon name="icon-alarm_16" slot="custom-right-content"></md-icon>
        </md-chip>
      </md-theme>
    `;
  } else if (args.iconSet) {
    return html`
      <md-theme class="theme-toggle" id="chip" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-chip value="example-chip@cisco.com" icon="${args.icon}" iconColor="${args.colorIcon}"> </md-chip>
      </md-theme>
    `;
  } else {
    return html`
      <md-theme class="theme-toggle" id="chip" ?darkTheme=${args.darkTheme} theme=${args.theme}>
        <md-chip
          .color=${args.color}
          .bgColor=${args.bgColor}
          .textColor=${args.textColor}
          .small=${args.small}
          .height=${args.height}
          .value="${args.valueText}"
          .disabled=${args.disabled}
          ?readonly=${args.readonly}
        ></md-chip>
      </md-theme>
    `;
  }
};

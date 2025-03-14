/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/chip/Chip";
import "@/components/icon/Icon";
import { BarType, chipColor, iconColorSample, iconSamples } from "@/utils/enums";
import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit";

export default {
  title: "Components/Chip",
  component: "md-chip",
  argTypes: {
    color: { control: { type: "select" }, options: chipColor },
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
    type: { control: { type: "select" }, options: BarType, defaultValue: "indeterminate" },
    value: { control: { type: "number" } },
    icon: { control: { type: "select" }, options: iconSamples },
    iconColor: { control: { type: "select" }, options: iconColorSample }
  },
  parameters: {
    a11y: {
      element: "md-chip"
    }
  }
};

export const Chip: StoryObj = {
  args: {
    color: "blue",
    textColor: "white",
    valueText: "replace this with long string",
    type: "indeterminate"
  },
  render: (args: Args) => {
    if (args.isLoad) {
      return args.type === "indeterminate"
        ? html` <md-chip value="example-chip@cisco.com" indeterminateProgress> </md-chip> `
        : html` <md-chip value="example-chip@cisco.com" determinateProgress="${args.value}"> </md-chip> `;
    } else if (args.slot) {
      return html`
        <md-chip value="example-chip@cisco.com">
          <md-icon name="icon-alert_16" slot="custom-left-content"></md-icon>
          <md-icon name="icon-alarm_16" slot="custom-right-content"></md-icon>
        </md-chip>
      `;
    } else if (args.iconSet) {
      return html`
        <md-chip value="example-chip@cisco.com" icon="${args.icon}" iconColor="${args.colorIcon}"> </md-chip>
      `;
    } else {
      return html`
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
      `;
    }
  }
};

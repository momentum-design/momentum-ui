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
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

export const Chip: StoryObj = {
  args: {
    color: "blue",
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

export const SentimentChips: StoryObj = {
  render: () => {
    return html`
      <div style="display: flex; gap: 8px; align-items: center;">
        <md-chip value="Positive" color="positive" small>
          <md-icon name="emoji-happy-filled" size="16" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
          <md-icon name="arrow-tail-up-bold" size="16" iconSet="momentumDesign" slot="custom-right-content"></md-icon>
        </md-chip>
        <md-chip value="Negative" color="negative" small>
          <md-icon name="emoji-unhappy-filled" size="16" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
          <md-icon name="arrow-tail-up-bold" size="16" iconSet="momentumDesign" slot="custom-right-content"></md-icon>
        </md-chip>
        <md-chip value="Neutral" color="neutral" small>
          <md-icon name="emoji-passive-filled" size="16" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
          <md-icon name="arrow-tail-up-bold" size="16" iconSet="momentumDesign" slot="custom-right-content"></md-icon>
        </md-chip>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: "Sentiment chips use color and icons to convey positive, negative or neutral feedback."
      }
    }
  }
};

export const InteractionStatusChips: StoryObj = {
  render: () => {
    return html`
      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <md-chip value="Agent name - 00:00" color="status-positive" small>
          <md-icon name="participant-filled" size="16" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
        </md-chip>
        <md-chip value="%Wrap-up alert% - 00:00" color="status-negative" small suppress-default-max-width>
          <md-icon name="alert-active-filled" size="16" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
        </md-chip>
        <md-chip value="Wrap-up - 00:00" color="status-accent" small>
          <md-icon name="archive-filled" size="16" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
        </md-chip>
        <md-chip value="Barged - 00:00" color="status-warning" small>
          <md-icon name="call-barge-filled" size="16" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
        </md-chip>
        <md-chip value="On hold - 00:00" color="status-orange" small>
          <md-icon name="call-hold-filled" size="16" iconSet="momentumDesign" slot="custom-left-content"></md-icon>
        </md-chip>
      </div>
    `;
  },
  parameters: {
    docs: {
      description: {
        story: "Status chips display agent and call states with appropriate status colors and icons."
      }
    }
  }
};

const meta: Meta = {
  title: "Components/Chip",
  component: "md-chip",
  argTypes: {
    color: { control: { type: "select" }, options: chipColor },
    bgColor: { control: "text" },
    textColor: { control: "text" },
    height: { control: "text" },
    valueText: { control: "text" },
    small: { control: "boolean" },
    disabled: { control: "boolean" },
    readonly: { control: "boolean" },
    isLoad: { control: "boolean" },
    slot: { control: "boolean" },
    iconSet: { control: "boolean" },
    type: { control: { type: "select" }, options: BarType },
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

export default meta;

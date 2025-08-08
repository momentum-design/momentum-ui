/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/badge/NotificationBadge";
import "@/components/button/Button";
import "@/components/icon/Icon";
import { action } from "@storybook/addon-actions";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { buttonColor, buttonRoles, buttonSize, buttonTag, buttonType, buttonVariant } from "./Button"; // Keep type import as a relative path
import mdx from "./Button.mdx";

const render = (args: Args) => html`
  <md-button
    @button-click=${action("detail")}
    variant=${args.variant}
    .color=${args.color}
    .disabled=${args.disabled}
    .circle=${args.circle}
    .loading=${args.loading}
    .size=${args.size}
    .tag=${args.tag}
    .type=${args.type}
    .ariaLabel=${args.ariaLabel}
    .ariaLabelledBy=${args.ariaLabelledBy}
    .ariaExpanded=${args.ariaExpanded}
    .ariaHaspopup=${args.ariaHaspopup}
    .ariaPressed=${args.ariaPressed}
    .containerLarge=${args.containerLarge}
    .href=${args.href}
    .label=${args.label}
    .value=${args.value}
    .outline=${args.outline}
    .hasRemoveStyle=${args.hasRemoveStyle}
    role=${args.role}
  >
    ${args.circle
      ? html` <md-icon slot="icon" name="search-bold" size="12" iconSet="momentumDesign"></md-icon> `
      : html` <span slot="text">Button</span> `}
  </md-button>
`;

export const Button: StoryObj = {
  args: {
    variant: "primary",
    size: "32",
    tag: "button",
    type: "button",
    role: "button"
  },
  render: render
};

const meta: Meta = {
  title: "Components/Button",
  component: "md-button",
  argTypes: {
    renderWidth: { table: { disable: true } },
    renderMaxWidth: { table: { disable: true } },
    buttonClassMap: { table: { disable: true } },
    iconTemplate: { table: { disable: true } },
    textTemplate: { table: { disable: true } },
    slottedText: { table: { disable: true } },
    getStyles: { table: { disable: true } },
    keyboardKey: { table: { disable: true } },
    variant: { control: { type: "select" }, options: buttonVariant },
    color: { control: { type: "select" }, options: buttonColor },
    size: { control: { type: "select" }, options: buttonSize },
    tag: { control: { type: "select" }, options: buttonTag },
    type: { control: { type: "select" }, options: buttonType },
    role: { control: { type: "select" }, options: buttonRoles }
  },
  parameters: {
    a11y: {
      element: "md-button"
    },
    docs: {
      page: mdx,
      description: {
        component: "Button Documentation"
      }
    }
  }
};

export const Notification: StoryObj = {
  render: () => html`
    <div style="display: flex; gap: 1.5rem; align-items: center; padding: 1rem;">
      <md-button variant="secondary" circle size="28">
        <md-icon slot="icon" name="sign-out-bold" iconSet="momentumDesign"></md-icon>
        <md-notification-badge slot="notification" type="success" overlay></md-notification-badge>
      </md-button>
      <md-button variant="secondary" circle size="32">
        <md-icon slot="icon" name="chat-filled" iconSet="momentumDesign"></md-icon>
        <md-notification-badge slot="notification" type="dot" overlay></md-notification-badge>
      </md-button>
      <md-button variant="secondary" circle size="40">
        <md-icon slot="icon" name="chat-filled" iconSet="momentumDesign" size="24"></md-icon>
        <md-notification-badge slot="notification" type="error" overlay></md-notification-badge>
      </md-button>
      <md-button variant="secondary" size="28">
        <span slot="text">Pill Button</span>
        <md-notification-badge slot="notification" type="warning" overlay></md-notification-badge>
      </md-button>
      <md-button variant="secondary" size="32">
        <span slot="text">Another Pill</span>
        <md-notification-badge slot="notification" type="error" overlay></md-notification-badge>
      </md-button>
      <md-button variant="secondary" size="40">
        <span slot="text">Another Pill</span>
        <md-notification-badge slot="notification" type="dot" overlay></md-notification-badge>
      </md-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: "Displays secondary buttons in circle and pill (rounded) shapes with various notification badges."
      }
    }
  }
};

export default meta;

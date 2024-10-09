/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/icon/Icon";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-element";
import { buttonColor, buttonRoles, buttonSize, buttonTag, buttonType, buttonVariant } from "./Button"; // Keep type import as a relative path
import mdx from "./Button.mdx";

const render = (args: Args) => html`
  <md-theme class="theme-toggle" id="button" ?darkTheme=${args.darkTheme} theme=${args.theme}>
    <md-button
      @button-click=${action("ditail")}
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
  </md-theme>
`;

export const Button: StoryObj = {
  args: {
    theme: "lumos",
    darkTheme: false,
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
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" },
    renderWidth: { table: { disable: true } },
    renderMaxWidth: { table: { disable: true } },
    buttonClassMap: { table: { disable: true } },
    iconTemplate: { table: { disable: true } },
    textTemplate: { table: { disable: true } },
    slottedText: { table: { disable: true } },
    getStyles: { table: { disable: true } },
    keyboardKey: { table: { disable: true } },
    variant: { control: { type: "select", options: buttonVariant } },
    color: { control: { type: "select", options: buttonColor } },
    size: { control: { type: "select", options: buttonSize } },
    tag: { control: { type: "select", options: buttonTag } },
    type: { control: { type: "select", options: buttonType } },
    role: { control: { type: "select", options: buttonRoles } }
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

export default meta;

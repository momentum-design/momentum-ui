/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/dropdown/Dropdown";

import {
  dropdownObjectKeyValueOptions,
  dropdownObjectLongOptions,
  dropdownStringLongOptions,
  dropdownStringOptions
} from "@/[sandbox]/examples/dropdown";
import { ThemeNameValues } from "@/components/theme/Theme";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";

export default {
  title: "Components/Dropdown",
  component: "md-dropdown",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" },
    title: { control: "text", defaultValue: "Select..." },
    disabled: { control: "boolean" },
    newMomentum: { control: "boolean" },
    searchable: { control: "boolean" },
    leftIcon: { control: "text" },
    placeholder: { control: "text" },
    simpleLong: { control: "boolean" },
    singleKeyValue: { control: "boolean" },
    multiKeyValue: { control: "boolean" }
  },
  parameters: {
    a11y: {
      element: "md-dropdown"
    }
  }
};

const renderSimpleLong = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="dropdown" ?darkTheme="${args.darkTheme}" theme=${args.theme}>
      <md-dropdown
        .options="${dropdownStringLongOptions}"
        .defaultOption="${dropdownStringLongOptions[29]}"
        .title="${args.title}"
        ?disabled="${args.disabled}"
        ?newMomentum="${args.newMomentum}"
        ?searchable="${args.searchable}"
        .leftIcon="${args.leftIcon}"
        .placeholder="${args.placeholder}"
      ></md-dropdown>
    </md-theme>
  `;
};

const renderSimpleKeyValue = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="dropdown" ?darkTheme="${args.darkTheme}" theme=${args.theme}>
      <md-dropdown
        .options="${dropdownObjectKeyValueOptions}"
        .title="${args.title}"
        ?disabled="${args.disabled}"
        ?newMomentum="${args.newMomentum}"
        ?searchable="${args.searchable}"
        .leftIcon="${args.leftIcon}"
        .placeholder="${args.placeholder}"
      ></md-dropdown>
    </md-theme>
  `;
};

const renderMultiKeyValue = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="dropdown" ?darkTheme="${args.darkTheme}" theme=${args.theme}>
      <md-dropdown
        .options="${dropdownObjectLongOptions}"
        option-id="id"
        option-value="country"
        .title="${args.title}"
        ?disabled="${args.disabled}"
        ?newMomentum="${args.newMomentum}"
        ?searchable="${args.searchable}"
        .leftIcon="${args.leftIcon}"
        .placeholder="${args.placeholder}"
      ></md-dropdown>
    </md-theme>
  `;
};

const renderDropdownStringValues = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="dropdown" ?darkTheme="${args.darkTheme}" theme=${args.theme}>
      <md-dropdown
        .options="${dropdownStringOptions}"
        .title="${args.title}"
        ?disabled="${args.disabled}"
        ?newMomentum="${args.newMomentum}"
        ?searchable="${args.searchable}"
        .leftIcon="${args.leftIcon}"
        .placeholder="${args.placeholder}"
      ></md-dropdown>
    </md-theme>
  `;
};

export const Dropdown = (args: Args) => {
  if (args.simpleLong) {
    return renderSimpleLong(args);
  } else if (args.singleKeyValue) {
    return renderSimpleKeyValue(args);
  } else if (args.multiKeyValue) {
    return renderMultiKeyValue(args);
  } else {
    return renderDropdownStringValues(args);
  }
};

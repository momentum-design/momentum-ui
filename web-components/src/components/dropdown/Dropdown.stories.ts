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
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { ThemeNameValues } from "@/components/theme/Theme";

export default {
  title: "Components/Dropdown",
  component: "md-dropdown",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-dropdown"
    }
  }
};

export const Dropdown = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const title = text("title", "Select...?");
  const disabled = boolean("Disabled", false);

  const simpleLong = boolean("Simple Long strings", false);

  const singleKeyValue = boolean("Single KeyValue objects", false);
  const multiKeyValue = boolean("Multi KeyValue objects", false);

  if (simpleLong) {
    return html`
      <md-theme class="theme-toggle" id="dropdown" ?darkTheme="${darkTheme}" ?lumos="${lumos}" theme=${theme}>
        <md-dropdown
          .options="${dropdownStringLongOptions}"
          .defaultOption="${dropdownStringLongOptions[29]}"
          .title="${title}"
          ?disabled="${disabled}"
        ></md-dropdown>
      </md-theme>
    `;
  } else if (singleKeyValue) {
    return html`
      <md-theme class="theme-toggle" id="dropdown" ?darkTheme="${darkTheme}" ?lumos="${lumos}">
        <md-dropdown
          .options="${dropdownObjectKeyValueOptions}"
          .title="${title}"
          ?disabled="${disabled}"
        ></md-dropdown>
      </md-theme>
    `;
  } else if (multiKeyValue) {
    return html`
      <md-theme class="theme-toggle" id="dropdown" ?darkTheme="${darkTheme}" ?lumos="${lumos}">
        <md-dropdown
          .options="${dropdownObjectLongOptions}"
          option-id="id"
          option-value="country"
          .title="${title}"
          ?disabled="${disabled}"
        ></md-dropdown>
      </md-theme>
    `;
  } else {
    return html`
      <md-theme class="theme-toggle" id="dropdown" ?darkTheme="${darkTheme}" ?lumos="${lumos}">
        <md-dropdown .options="${dropdownStringOptions}" .title="${title}" ?disabled="${disabled}"></md-dropdown>
      </md-theme>
    `;
  }
};

/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/input/Input";
import "@/components/label/Label";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit";

export default {
  title: "Components/Label",
  component: "md-label",
  decorators: [withKnobs, withA11y],
  argTypes: {
    theme: { table: { disable: true } },
    radioLabel: { table: { disable: true } },
    checkboxLabel: { table: { disable: true } },
    toggleSwitchLabel: { table: { disable: true } },
    active: { table: { disable: true } },
    indeterminate: { table: { disable: true } },
    labelClassMap: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-label"
    }
  }
};

export const Label = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const label = text("Label", "Label");
  const withInput = boolean("With Input", false);
  const secondaryLabel = text("Secondary Label", "");

  if (withInput) {
    return html`
    <md-theme class="theme-toggle" id="label" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-input @label-click=${action('click')} .label=${label} placeholder="placeholder text" .secondaryLabel=${secondaryLabel}> </md-input>
    </md-theme>
    `;
  } else {
    return html`
    <md-theme class="theme-toggle" id="input" ?darkTheme=${darkTheme}>
      <md-label htmlFor="#">${label}</md-label>
    </md-theme>
    `;
  }
};

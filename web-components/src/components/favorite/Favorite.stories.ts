/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/favorite/Favorite";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { action } from '@storybook/addon-actions';

export default {
  title: "Components/Favorite",
  component: "md-favorite",
  decorators: [withKnobs, withA11y],
  argTypes: {
    toggleSwitchClassMap: { table: { disable: true } },
    autofocus: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-favorite"
    }
  }
};

export const Favorite = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const active = boolean("Checked", false);
  const disabled = boolean("Disabled", false);

  return html`
  <md-theme class="theme-toggle" id="toggle" ?darkTheme=${darkTheme} ?lumos=${lumos}>
    <md-favorite @favorite-elect=${(action('favorite-elect'))} id="favorite-switch" ?active=${active} ?disabled=${disabled}></md-favorite>
  </md-theme>
  `;
};
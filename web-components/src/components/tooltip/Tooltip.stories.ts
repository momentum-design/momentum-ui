/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import { select, text, boolean, withKnobs } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';
import { html } from "lit-element";
import "@/components/button/Button";
import "@/components/tooltip/Tooltip";
import { tooltipPlacement } from "@/components/tooltip/Tooltip";
import "@/components/theme/Theme";

export default {
  title: "Tooltip",
  component: "md-tooltip",
  decorators: [withKnobs, withA11y],
  argTypes: {
    reference: { table: { disable: true } },
    popper: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-tooltip"
    }
  }
};

export const Tooltip = () => {
  const darkTheme = boolean("darkMode", false);
  const message = text("message", "Test tooltip");
  const placement = select("placement", tooltipPlacement, "right");

  return html`
    <md-theme class="theme-toggle" id="tooltip" ?darkTheme=${darkTheme}>
      <md-tooltip message=${message} placement=${placement} @tooltip-create=${(action('show'))} @tooltip-destroy=${(action('hide'))}>
        <md-button>Test Button</md-button>
      </md-tooltip>
    </md-theme>
  `;
};

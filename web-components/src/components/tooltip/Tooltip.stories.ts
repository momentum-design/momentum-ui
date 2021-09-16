/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/theme/Theme";
import "@/components/tooltip/Tooltip";
import { withA11y } from "@storybook/addon-a11y";
import { action } from "@storybook/addon-actions";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit";
import { tooltipPlacement } from "./Tooltip"; // Keep type import as a relative path

export default {
  title: "Components/Tooltip",
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
  const lumos = boolean("Lumos Theme", false);
  const message = text("message", "Test tooltip");
  const placement = select("placement", tooltipPlacement, "right");
  const opened = boolean("Opened", false);

  return html`
    <md-theme class="theme-toggle" id="tooltip" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-tooltip
        message=${message}
        placement=${placement}
        @tooltip-create=${action("show")}
        @tooltip-destroy=${action("hide")}
        ?opened=${opened}
      >
        <md-button>Test Button</md-button>
      </md-tooltip>
    </md-theme>
  `;
};

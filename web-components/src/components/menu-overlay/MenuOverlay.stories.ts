/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/button/Button";
import "@/components/checkbox/Checkbox";
import "@/components/input/Input";
import "@/components/menu-overlay/MenuOverlay";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import { boolean, number, select, text } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { menuOverlayPlacement, menuOverlayRole, menuOverlaySize } from "./MenuOverlay"; // Keep type import as a relative path

export default {
  title: "Components/Menu Overlay",
  component: "md-menu-overlay",
  argTypes: {
    handleOutsideOverlayClick: { table: { disable: true } },
    handleTriggerKeyDown: { table: { disable: true } },
    handleOutsideOverlayKeydown: { table: { disable: true } },
    trigger: { table: { disable: true } },
    arrow: { table: { disable: true } },
    overlayContainer: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-menu-overlay"
    }
  }
};

export const MenuOverlay = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const isOpen = boolean("isOpen", false);
  const disabled = boolean("Disabled", false);
  const placement = select("placement", menuOverlayPlacement, "bottom");
  const showArrow = boolean("Show Arrow", false);
  const size = select("size", menuOverlaySize, "large");
  const maxHeight = text("max height", "");
  const customWidth = text("custom width", "");
  const ariaRole = select("ariaRole", menuOverlayRole, "menu");
  const ariaLabel = text("AriaLabel", "Link Storybook");
  const overlayOffset = number("overlay offset", 15);

  return html`
    <md-theme class="theme-toggle" id="menu-overlay" ?darkTheme=${darkTheme} theme=${theme}>
      <md-menu-overlay
        style="margin: 10rem"
        placement=${placement}
        size=${size}
        max-height=${maxHeight}
        custom-width=${customWidth}
        ariaRole=${ariaRole}
        ariaLabel=${ariaLabel}
        ?is-open=${isOpen}
        ?show-arrow=${showArrow}
        ?disabled=${disabled}
        @menu-overlay-open=${action("click open")}
        @menu-overlay-close=${action("click close")}
        overlay-offset=${overlayOffset}
      >
        <md-button slot="menu-trigger" variant="primary">Open Menu Overlay</md-button>
        <div style="padding:1.25rem ; width: 100%;">
          <md-input
            htmlId="inputSearchClearPill"
            containerSize="small-12"
            placeholder="Enter Text"
            shape="pill"
            clear
          ></md-input>
          <md-checkbox>Default Checkbox</md-checkbox>
          <md-checkbox checked>Default Checked Checkbox</md-checkbox>
          <md-checkbox indeterminate>Default Indeterminate Checkbox</md-checkbox>
          <div style="text-align: center">
            <p style="margin-bottom: .5rem">Please complete the entire form</p>
            <md-button variant="primary">Submit</md-button>
          </div>
        </div>
      </md-menu-overlay>
      <iframe style="float: left; margin-top: 200px;" title="iframe-to-test-menu-closing" src="http://127.0.0.1:8080/?path=/story/components-date-range-picker--date-range-picker"></iframe>
    </md-theme>
  `;
};

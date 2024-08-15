/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/modal/Modal";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import { boolean, select, text } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { modalType } from "./Modal"; // Keep type import as a relative path

export default {
  title: "Components/Modal",
  component: "md-modal",
  argTypes: {
    htmlId: { table: { disable: true } },
    noExitOnEsc: { table: { disable: true } },
    backDrop: { table: { disable: true } },
    handleCloseOutside: { table: { disable: true } },
    modalBackDropClassMap: { table: { disable: true } },
    modalContainerClassMap: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-modal"
    }
  }
};

const content = html`
  <p>
    This pattern may seem inefficient, since the same style sheet is reproduced in a each instance of an element.
    However, the browser can deduplicate multiple instances of the same style sheet, so the cost of parsing the style
    sheet is only paid once.
  </p>
`;

export const Modal = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const show = boolean("show", false);
  const headerLabel = text("headerLabel", "Test header text");
  const headerMessage = text("message", "Test message in header");
  const size = select("Modal size", modalType, "default");
  const closeBtnName = text("closeBtnName", "Save");
  const showCloseButton = boolean("showCloseButton", true);
  const backdropClickExit = boolean("OutsideClick", false);
  const hideFooter = boolean("hideFooter", false);
  const hideHeader = boolean("hideHeader", false);

  return html`
    <md-theme class="theme-toggle" id="modal" ?darkTheme=${darkTheme} theme=${theme}>
      <md-modal
        .size="${size}"
        .show=${show}
        headerLabel="${headerLabel}"
        headerMessage="${headerMessage}"
        closeBtnName="${closeBtnName}"
        .showCloseButton="${showCloseButton}"
        .backdropClickExit="${backdropClickExit}"
        ?hideFooter=${hideFooter}
        ?hideHeader=${hideHeader}
        @close-modal=${action("click")}
      >
        <div slot="header">
          <span>Test slot header</span>
        </div>
        ${content}
        <div slot="footer">
          <span>Test slot footer</span>
        </div>
      </md-modal>
    </md-theme>
  `;
};

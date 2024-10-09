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
import { Args } from "@storybook/web-components";
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
    modalContainerClassMap: { table: { disable: true } },
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    show: { control: "boolean", defaultValue: false },
    headerLabel: { control: "text", defaultValue: "Test header text" },
    headerMessage: { control: "text", defaultValue: "Test message in header" },
    size: { control: { type: "select", options: modalType }, defaultValue: "default" },
    closeBtnName: { control: "text", defaultValue: "Save" },
    showCloseButton: { control: "boolean", defaultValue: true },
    backdropClickExit: { control: "boolean", defaultValue: false },
    hideFooter: { control: "boolean", defaultValue: false },
    hideHeader: { control: "boolean", defaultValue: false }
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

export const Modal = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="modal" ?darkTheme=${args.darkTheme} theme=${args.theme}>
      <md-modal
        .size="${args.size}"
        .show=${args.show}
        headerLabel="${args.headerLabel}"
        headerMessage="${args.headerMessage}"
        closeBtnName="${args.closeBtnName}"
        .showCloseButton="${args.showCloseButton}"
        .backdropClickExit="${args.backdropClickExit}"
        ?hideFooter=${args.hideFooter}
        ?hideHeader=${args.hideHeader}
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

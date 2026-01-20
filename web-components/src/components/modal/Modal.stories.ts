/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/modal/Modal";
import { action } from "storybook/actions";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { modalType } from "./Modal"; // Keep type import as a relative path

const content = html`
  <p>
    This pattern may seem inefficient, since the same style sheet is reproduced in a each instance of an element.
    However, the browser can deduplicate multiple instances of the same style sheet, so the cost of parsing the style
    sheet is only paid once.
  </p>
`;

const render = (args: Args) => {
  return html`
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
  `;
};

export const Modal: StoryObj = {
  args: {
    show: true,
    size: "default",
    headerLabel: "Test header text",
    headerMessage: "Test message in header",
    closeBtnName: "Save",
    showCloseButton: true,
    backdropClickExit: false,
    hideFooter: false,
    hideHeader: false
  },
  render: render
};

const meta: Meta = {
  title: "Components/Modal",
  component: "md-modal",
  argTypes: {
    htmlId: { table: { disable: true } },
    noExitOnEsc: { table: { disable: true } },
    backDrop: { table: { disable: true } },
    handleCloseOutside: { table: { disable: true } },
    modalBackDropClassMap: { table: { disable: true } },
    modalContainerClassMap: { table: { disable: true } },

    size: { control: { type: "select" }, options: modalType },
    closeBtnName: { control: "text" },
    showCloseButton: { control: "boolean" },
    backdropClickExit: { control: "boolean" },
    alignment: { control: { type: "select" }, options: [undefined, "leading", "center"] }
  },
  parameters: { a11y: { element: "md-modal" } }
};

export default meta;

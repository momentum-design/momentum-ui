/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/floating-button-bar/FloatingButtonBar";
import { action } from "@storybook/addon-actions";
import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const backToTopAction = {
  label: "Back to top",
  icon: "arrow-tail-up-bold",
  isIconOnly: true,
  iconAlign: "right",
  action: () => {
    action("back-to-top-action")();
  }
};

const assignToMeAction = {
  label: "Assign to me",
  isIconOnly: false,
  iconAlign: "right",
  action: () => {
    action("assign-to-me-action")();
  }
};

const groupActions = {
  actions: [assignToMeAction, backToTopAction]
};

const render = (args: Args) => html`
  <div
    style="width: 286px; height: 200px; background: var(--md-glass-bg-color); padding: 1rem; display: flex; align-items: flex-end;"
  >
    <md-floating-button-bar
      closeButtonAriaLabel=${args.closeButtonAriaLabel}
      leadingLabel=${args.leadingLabel}
      ?showCancelButton=${args.showCancelButton}
      .actions=${args.actions}
      @cancel-button-action=${action("cancel-button-action")}
    ></md-floating-button-bar>
  </div>
`;

export const FloatingButtonBar: StoryObj = {
  args: {
    leadingLabel: "4 selected",
    showCancelButton: true,
    closeButtonAriaLabel: "Clear selection",
    actions: [groupActions]
  },
  render: render
};

const meta: Meta = {
  title: "Components/Floating Button Bar",
  component: "md-floating-button-bar",
  argTypes: {},
  parameters: {
    a11y: {
      element: "md-floating-button-bar"
    }
  }
};

export default meta;

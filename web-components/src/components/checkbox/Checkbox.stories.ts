/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/checkbox/Checkbox";
import "@/components/checkbox/CheckboxGroup";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const render = (args: Args) => html`
  ${args.group
    ? html`
        <md-checkboxgroup group-label="group_process">
          <md-checkbox slot="checkbox" .checked=${args.check}>Developing</md-checkbox>
          <md-checkbox slot="checkbox" .disabled=${args.disable}>Linting</md-checkbox>
          <md-checkbox slot="checkbox">Testing</md-checkbox>
          <md-checkbox slot="checkbox" .indeterminate=${args.indeter}>Building</md-checkbox>
        </md-checkboxgroup>
      `
    : html`
        <md-checkbox
          label="${args.label}"
          .checked=${args.check}
          .disabled=${args.disable}
          .indeterminate=${args.indeter}
        >
          Developing
        </md-checkbox>
      `}
`;

export const Checkbox: StoryObj = {
  args: {
    label: "Checkbox",
    check: false,
    disable: false,
    indeter: false,
    group: false
  },
  render: render
};

const meta: Meta = {
  title: "Components/Checkbox",
  component: "md-checkbox",
  argTypes: {},
  parameters: {
    a11y: {
      element: "md-checkbox"
    }
  }
};

export default meta;

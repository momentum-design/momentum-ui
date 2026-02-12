/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/form/Form";
import "@/components/input/Input";
import { action } from "storybook/actions";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const render = (args: Args) => {
  return html`
    <md-form
      ?no-validate=${args.noValidate}
      ?allow-redirect=${args.allowRedirect}
      ?is-valid=${args.isValid}
      @form-submitted=${action("Form Submitted")}
      action="https://www.wikipedia.org/"
      rel="search"
      label="User Submit Form"
      target=${args.target}
      enctype=${args.enctype}
      autofill-name=${args.autoFillName}
    >
      <md-input name="user-surname"></md-input>
      <md-button type="submit">Submit</md-button>
    </md-form>
  `;
};

export const Form: StoryObj = {
  args: {
    noValidate: false,
    allowRedirect: true,
    isValid: false,
    target: "_self",
    enctype: "application/x-www-form-urlencoded",
    autoFillName: "submittable-element"
  },
  render: render
};

const meta: Meta = {
  title: "Components/Form",
  component: "md-form",
  argTypes: {
    noValidate: { control: "boolean" },
    allowRedirect: { control: "boolean" },
    isValid: { control: "boolean" },
    target: { control: { type: "select" }, options: ["_self", "_blank", "_parent", "_top"] },
    enctype: {
      control: { type: "select" },
      options: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]
    },
    autoFillName: { control: "text" }
  },
  parameters: { a11y: { context: "md-form" } }
};

export default meta;

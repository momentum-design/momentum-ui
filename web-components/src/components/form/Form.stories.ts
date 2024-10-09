/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/form/Form";
import "@/components/input/Input";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";

export default {
  title: "Components/Form",
  component: "md-form",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    noValidate: { control: "boolean", defaultValue: false },
    allowRedirect: { control: "boolean", defaultValue: true },
    isValid: { control: "boolean", defaultValue: false },
    target: { control: { type: "select", options: ["_self", "_blank", "_parent", "_top"] }, defaultValue: "_self" },
    enctype: {
      control: { type: "select", options: ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"] },
      defaultValue: "application/x-www-form-urlencoded"
    },
    autoFillName: { control: "text", defaultValue: "submittable-element" }
  },
  parameters: {
    a11y: {
      element: "md-form"
    }
  }
};

export const Form = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" id="icon" ?darkTheme=${args.darkTheme} theme=${args.theme}>
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
    </md-theme>
  `;
};

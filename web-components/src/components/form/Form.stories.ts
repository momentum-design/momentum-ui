/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/form/Form";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { html } from "lit-element";
import { ThemeNameValues } from "@/components/theme/Theme";

export default {
  title: "Components/Form",
  component: "md-form",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-form"
    }
  }
};

export const Form = () => {
  const darkTheme = boolean("Dark Mode", false);
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const noValidate = boolean("Allow form shouldn't be validated when submitted", false);
  const allowRedirect = boolean("Allow redirect to the action URL", true);
  const isValid = boolean("Is form valid", false);
  const target = select("Choose browsing context", ["_self", "_blank", "_parent", "_top"], "_self");
  const enctype = select(
    "Choose MIME type of the form submission",
    ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"],
    "application/x-www-form-urlencoded"
  );
  const autoFillName = text(
    "Enter value for `id` and `name` attributes for any submittable elements (in case if they aren't provided)",
    "submittable-element"
  );

  return html`
    <md-theme class="theme-toggle" id="icon" ?darkTheme=${darkTheme} ?lumos=${lumos} theme=${theme}>
      <md-form
        ?no-validate=${noValidate}
        ?allow-redirect=${allowRedirect}
        ?is-valid=${isValid}
        @form-submitted=${action("Form Submitted")}
        action="https://www.wikipedia.org/"
        rel="search"
        label="User Submit Form"
        target=${target}
        enctype=${enctype}
        autofill-name=${autoFillName}
      >
        <md-input name="user-surname"></md-input>
        <md-button type="submit">Submit</md-button>
      </md-form>
    </md-theme>
  `;
};

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
import { boolean, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Form",
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
  const novalidate = boolean("Novalidate", false);
  const isvalid = boolean("Is Valid", false);

  return html`
    <md-theme class="theme-toggle" id="icon" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-form ?novalidate=${novalidate} ?is-valid=${isvalid}>
        <md-input></md-input>
        <md-button type="submit">Submit</md-button>
      </md-form>
    </md-theme>
  `;
};

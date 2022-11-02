/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/alert/Alert";
import "@/components/theme/Theme";
import { alertTypes } from "@/utils/enums";
import { withA11y } from "@storybook/addon-a11y";
import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import "../badge/Badge";

export default {
  title: "Components/Alerts/Alert",
  component: "md-alert",
  decorators: [withKnobs, withA11y],
  argTypes: {
    renderIconTemplate: { table: { disable: true } },
    alertClassMap: { table: { disable: true } },
    internalClose: {description: 'By default closing internally, othervise - controlling outer via .show',}
  },
  parameters: {
    a11y: {
      element: "md-alert"
    },
    docs: { 
      description: { 
        component: 'A typical usage of Alert, with text added within the element tags or message attribute' 
      },
    }
  }
};

export const Alert = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos theme", false);
  const show = boolean("Show", true);
  const title = text("Title", "Alert");
  const message = text("Message", "Who is awesome? You are!");
  const type = select("Type", alertTypes, "default");
  const closable = boolean("clossable", true);
  const inline = boolean("Inline", false);

  return html`
    <md-theme class="theme-toggle" id="alert" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-alert @alert-close=${(action('dispatchEvent'))} title=${title} message=${message} type=${type} ?closable=${closable} ?show=${show} .inline=${inline}></md-alert>
    </md-theme>
  `;
};

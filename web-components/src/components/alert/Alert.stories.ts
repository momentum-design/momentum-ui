/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/alert/Alert";
import { ThemeNameValues } from "@/components/theme/Theme";
import { alertTypes } from "@/utils/enums";
import { action } from "@storybook/addon-actions";
import { boolean, select, text } from "@storybook/addon-knobs";
import { html } from "lit-html";
import "../badge/Badge";
import mdx from "./Alert.mdx";

export default {
  title: "Components/Alerts",
  component: "md-alert",
  argTypes: {
    renderIconTemplate: { table: { disable: true } },
    alertClassMap: { table: { disable: true } },
    internalClose: { description: "By default closing internally, otherwise - controlling outer via .show" }
  },
  parameters: {
    a11y: {
      element: "md-alert"
    },
    docs: {
      page: mdx,
      description: {
        component: "A typical usage of Alert, with text added within the element tags or message attribute"
      }
    }
  }
};

export const Alert = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const show = boolean("Show", true);
  const title = text("Title", "Alert");
  const message = text("Message", "Who is awesome? You are!");
  const type = select("Type", alertTypes, "default");
  const closable = boolean("closable", true);
  const inline = boolean("Inline", false);

  return html`
    <md-theme class="theme-toggle" id="alert" ?darkTheme=${darkTheme} theme=${theme}>
      <md-alert
        @alert-close=${action("dispatchEvent")}
        title=${title}
        message=${message}
        type=${type}
        ?closable=${closable}
        ?show=${show}
        .inline=${inline}
      ></md-alert>
    </md-theme>
  `;
};

export const AlertWithIcon = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const show = boolean("Show", true);
  const title = text("Title", "Alert");
  const message = text("Message", "Who is awesome? You are!");
  const closable = boolean("closable", true);

  return html`
    <md-theme class="theme-toggle" id="alert" ?darkTheme=${darkTheme} theme=${theme}>
      <md-alert
        @alert-close=${action("dispatchEvent")}
        title=${title}
        message=${message}
        ?show=${show}
        ?closable=${closable}
      >
        <md-badge slot="alert-icon" color="darkmint" circle>
          <md-icon name="sms_16" color="white-100"></md-icon>
        </md-badge>
      </md-alert>
    </md-theme>
  `;
};

export const AlertWithSlots = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const message = text("Message", "Who is awesome? You are!");

  return html`
    <md-theme class="theme-toggle" id="alert" ?darkTheme=${darkTheme} theme=${theme}>
      <md-alert message=${message} show>
        <a slot="alert-body" href="/">Test</a>
        <div slot="alert-footer">
          <md-button variant="primary"><span slot="text">Blue</span></md-button>
        </div>
      </md-alert>
    </md-theme>
  `;
};

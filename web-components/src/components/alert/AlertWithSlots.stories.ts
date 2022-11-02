/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

 import "@/components/alert/Alert";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import "../badge/Badge";
 
 export default {
   title: "Components/Alerts",
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
        component: 'A typical usage of Alert with slots, with text added within the element tags or message attribute' 
      },
      
    }
   }
 };
 
 export const AlertWithSlots = () => {
   const darkTheme = boolean("darkMode", false);
   const lumos = boolean("Lumos theme", false);
   const message = text("Message", "Who is awesome? You are!");
 
   return html`
    <md-theme class="theme-toggle" id="alert" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-alert message=${message} show>
        <a slot="alert-body" href="/">Test</a>
        <div slot="alert-footer">
          <md-button variant="primary"><span slot="text">Blue</span></md-button>
        </div>
    </md-alert>
  </md-theme>
   `;
 };
 
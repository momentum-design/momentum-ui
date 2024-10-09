/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/avatar/Avatar";
import "@/components/badge/Badge";
import "@/components/card/Card";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";
import { nothing } from "lit-html";

export const Card = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" ?darkTheme=${args.darkTheme} theme=${args.theme}>
      <md-card
        .menuOptions=${args.menu}
        id=${args.id}
        title=${args.title}
        subtitle=${args.subtitle}
        @card-menu-click=${(e: MouseEvent) => {
          action("card-click")(e.detail);
        }}
        @card-menu-keydown=${(e: KeyboardEvent) => {
          action("card-keydown")(e.detail, e);
        }}
        info=${args.info}
      >
        ${
          args.avatar
            ? html`
                <md-avatar slot="card-header-aside" alt="avatar" title="Alyson Hoagland Pace" size="44"></md-avatar>
              `
            : nothing
        }
        ${args.slotTitle ? html` <div slot="card-header-title"><h2>Test slot Title</h2></div> ` : nothing}
        <div slot="content">
          <img src=https://freepngimg.com/download/business/66729-google-business-big-analysis-analytics-data.png"
          alt="" />
        </div>

        <md-badge slot="footer" color="violet" small>Active</md-badge>
        <md-badge slot="footer" color="mint" small>Stock Report</md-badge>
        <md-badge slot="footer" color="gold" small>Team Report</md-badge>
        <md-badge slot="footer" color="lime" small>Team A</md-badge>
        <md-badge slot="footer" color="blue" small>TA</md-badge>
        <md-badge slot="footer" color="orange" small>Team B</md-badge>
        <md-badge slot="footer" color="blue" small>Some long long label</md-badge>
        <md-badge slot="footer" color="pink" small>Confidential</md-badge>
      </md-card>
    </md-theme>
  `;
};

const cardMenu = ["Edit", "View", "Duplicate", "Delete"];

export default {
  title: "Components/Card",
  component: "md-card",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" },
    menu: { control: { type: "array" }, description: "Menu Items", defaultValue: cardMenu },
    id: { defaultValue: "12345678" },
    title: { defaultValue: "Team A Report - Q1" },
    subtitle: { defaultValue: "Updated 2 hours ago" },
    avatar: {
      control: "boolean",
      defaultValue: false,
      description: "Change Favorite Icon in header on slot - 'card-header-icon'"
    },
    slotTitle: {
      control: "boolean",
      defaultValue: false,
      description: "Add custom Title in slot - 'card-header-title'"
    },
    info: { defaultValue: "Lorem Ipsum is simply sample text of the printing and typesetting industry." }
  },
  parameters: {
    a11y: {
      element: "md-card"
    }
  }
};

/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/card/Card";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { array, boolean, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { nothing } from "lit-html";
import { action } from "@storybook/addon-actions";

export default {
  title: "Card",
  component: "md-card",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-card"
    }
  }
};

const cardMenu = ["Edit", "View", "Duplicate", "Delete"];

export const Card = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const menu = array("Menu Items", cardMenu);
  const id = text("ID", "12345678");
  const title = text("Title", "Team A Report - Q1");
  const subtitle = text("Subtitle", "Updated 2 hours ago");
  const avatar = boolean("Change Favorite Icon in header on slot - 'card-header-icon'", false);
  const slottitle = boolean("Add custom Title in slot - 'card-header-title'", false);
  const info = text("Info", "Lorem Ipsum is simply dummy text of the printing and typesetting industry.");
  const fullscreen = boolean("FullScreen", false);

  return html`
    <md-theme class="theme-toggle" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-card
        .menuOption=${menu}
        id=${id}
        title=${title}
        subtitle=${subtitle}
        ?fullscreen=${fullscreen}
        @card-click=${(e: MouseEvent) => {
          action("card-click")(e.detail);
        }}
        @card-keydown=${(e: KeyboardEvent) => {
          action("card-keydown")(e.detail, e);
        }}
        info=${info}
      >
        ${avatar
          ? html`
              <md-avatar slot="card-header-icon" alt="avatar" title="Alyson Hoagland Pace" size="44"></md-avatar>
            `
          : nothing}
        ${slottitle
          ? html`
              <div slot="card-header-title"><h2>Test slot Title</h2></div>
            `
          : nothing}
        <div slot="content">
          <img
            src="https://media.istockphoto.com/vectors/dashboard-ui-modern-presentation-with-data-graphs-and-hud-diagrams-vector-id1159848977"
            alt=""
          />
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

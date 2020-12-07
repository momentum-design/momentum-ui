/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "@/components/link/Link";
import { linkTag, LinkColor } from "@/components/link/Link";
import "@/components/theme/Theme";

export default {
  title: "Link",
  component: "md-link",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-link"
    }
  }
};

export const Link = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const href = text("href", "http://google.com");
  const tag = select("HTML Tag", linkTag, "");
  const disabled = boolean("Disabled", false);
  const inline = boolean("Link Inline", false);
  const target = text("Target", "_self");
  const color = select("Link color", LinkColor, "blue")

  return html`
    <md-theme class="theme-toggle" id="link" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-link 
        .href=${href} 
        .tag=${tag} 
        .target="${target}"
        .color="${color}"
        ?disabled=${disabled} 
        ?inline=${inline}>Default Link</md-link>
    </md-theme>
  `;
};

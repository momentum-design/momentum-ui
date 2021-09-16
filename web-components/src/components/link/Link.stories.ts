/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/link/Link";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit";
import { linkColor, linkTag } from "./Link"; // Keep type import as a relative path

export default {
  title: "Components/Link",
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
  const color = select("Link color", linkColor, "blue");

  return html`
    <md-theme class="theme-toggle" id="link" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-link
        .href=${href}
        .tag=${tag as any}
        .target="${target}"
        .color="${color}"
        ?disabled=${disabled}
        ?inline=${inline}
        >Default Link</md-link
      >
    </md-theme>
  `;
};

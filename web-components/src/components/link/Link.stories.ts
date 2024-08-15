/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/link/Link";
import { ThemeNameValues } from "@/components/theme/Theme";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { linkColor, linkRole, linkTag } from "./Link"; // Keep type import as a relative path

export default {
  title: "Components/Link",
  component: "md-link",
  decorators: [withKnobs],
  parameters: {
    a11y: {
      element: "md-link"
    }
  }
};

export const Link = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const href = text("href", "http://google.com");
  const tag = select("HTML Tag", linkTag, "");
  const disabled = boolean("Disabled", false);
  const inline = boolean("Link Inline", false);
  const target = text("Target", "_self");
  const color = select("Link color", linkColor, "blue");
  const ariaLabel = text("AriaLabel", "Link Storybook");
  const role = select("Link Role", linkRole, "");

  return html`
    <md-theme class="theme-toggle" id="link" ?darkTheme=${darkTheme} theme=${theme}>
      <md-link
        .href=${href}
        .ariaLabel=${ariaLabel}
        .ariaRole=${role}
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

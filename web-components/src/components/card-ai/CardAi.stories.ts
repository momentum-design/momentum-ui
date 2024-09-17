/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/badge/Badge";
import { CardAiVariant } from "@/components/card-ai/CardAi";
import { ThemeNameValues } from "@/components/theme/Theme";
import { action } from "@storybook/addon-actions";
import { boolean, select, text } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Components/Card Ai",
  component: "md-card-ai",
  parameters: {
    a11y: {
      element: "md-card-ai"
    }
  }
};

export const CardAi = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");
  const variant = select("Variant", Object.values(CardAiVariant), CardAiVariant.RESPONSE);
  const id = text("ID", "12345678");
  const title = text("Title", "Title");
  const cardText = text("Card Text", "Card Text");
  const timestamp = text("Timestamp", "12:35 PM");
  const summariseMoreVisible = boolean("Summarise more visible", false);

  return html`
    <md-theme class="theme-toggle" ?darkTheme=${darkTheme} theme=${theme}>
      <md-card-ai
        id=${id}
        title=${title}
        cardText=${cardText}
        timestamp=${timestamp}
        variant=${variant}
        .summariseMoreVisible=${summariseMoreVisible}
        @thumbs-up-toggled=${(e: CustomEvent<{ id: string }>) => {
          action("thumbs-up-toggled")(e.detail);
        }}
        @thumbs-down-toggled=${(e: CustomEvent<{ id: string }>) => {
          action("thumbs-down-toggled")(e.detail);
        }}
        @summarise-more-toggled=${(e: CustomEvent<{ id: string }>) => {
          action("summarise-more-toggled")(e.detail);
        }}
      >
      </md-card-ai>
    </md-theme>
  `;
};

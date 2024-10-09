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
import { Args } from "@storybook/web-components";
import { html } from "lit-element";

export default {
  title: "Components/Card Ai",
  component: "md-card-ai",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" },
    variant: {
      control: { type: "select", options: Object.values(CardAiVariant) },
      defaultValue: CardAiVariant.RESPONSE
    },
    id: { control: "text", defaultValue: "12345678" },
    title: { control: "text", defaultValue: "Title" },
    cardText: { control: "text", defaultValue: "Card Text" },
    timestamp: { control: "text", defaultValue: "12:35 PM" },
    summariseMoreVisible: { control: "boolean", defaultValue: false }
  },
  parameters: {
    a11y: {
      element: "md-card-ai"
    }
  }
};

export const CardAi = (args: Args) => {
  return html`
    <md-theme class="theme-toggle" ?darkTheme=${args.darkTheme} theme=${args.theme}>
      <md-card-ai
        id=${args.id}
        title=${args.title}
        cardText=${args.cardText}
        timestamp=${args.timestamp}
        variant=${args.variant}
        .summariseMoreVisible=${args.summariseMoreVisible}
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

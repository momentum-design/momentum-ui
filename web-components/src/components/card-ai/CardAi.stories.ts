/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/badge/Badge";
import { CardAiVariant } from "@/components/card-ai/CardAi";
import { action } from "@storybook/addon-actions";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";

const render = (args: Args) => {
  return html`
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
  `;
};

export const CardAi: StoryObj = {
  args: {
    id: "12345678",
    title: "Title",
    cardText: "Card Text",
    timestamp: "12:35 PM",
    variant: CardAiVariant.RESPONSE,
    summariseMoreVisible: false
  },
  render: render
};

const meta: Meta = {
  title: "Components/Card Ai",
  component: "md-card-ai",
  argTypes: { variant: { control: { type: "select" }, options: Object.values(CardAiVariant) } },
  parameters: { a11y: { element: "md-card-ai" } }
};

export default meta;

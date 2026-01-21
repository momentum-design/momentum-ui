/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/favorite/Favorite";
import { Args } from "@storybook/web-components";
import { html } from "lit";
import { action } from "storybook/actions";

export default {
  title: "Components/Favorite",
  component: "md-favorite",
  argTypes: {
    toggleSwitchClassMap: { table: { disable: true } },
    autofocus: { table: { disable: true } },
    value: { control: "text", defaultValue: "Select favorite" }
  },
  tags: ["autodocs"],
  parameters: {
    a11y: {
      element: "md-favorite"
    }
  }
};

export const Favorite = (args: Args) => {
  return html`
    <md-favorite
      @favorite-toggle=${action("favorite-toggle")}
      id="favorite-switch"
      ?checked=${args.active}
      ?disabled=${args.disabled}
      value=${args.value}
    ></md-favorite>
  `;
};

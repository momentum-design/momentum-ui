/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./Presence";

const render = (args: Args) => {
    return html`
    <md-presence    
        size=${args.size}
        title=${args.title}
        presence-type=${args.type}
        .newMomentum=${args.newMomentum}
    >
    </md-presence>
  `;
};

export const Presence: StoryObj = {
    args: {
        size: 34,
        title: "active",
        type: "active",
        newMomentum: true
    },
    render: render
};

const meta: Meta = {
    title: "Components/Presence",
    component: "md-presence",
    argTypes: { size: { control: { type: "number" } } },
    parameters: { a11y: { element: "md-presence" } }
};

export default meta;

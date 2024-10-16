/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/audio-player/AudioPlayer";
import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-html";

const render = (args: Args) => html` <md-audio-player src=${args.src}></md-audio-player> `;

export const AudioPlayer: StoryObj = {
  args: {
    src: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav"
  },
  render: render
};

const meta: Meta = {
  title: "Components/Audio Player",
  component: "md-audio-player",
  argTypes: {},
  parameters: {
    a11y: {
      element: "md-audio-player"
    }
  }
};

export default meta;

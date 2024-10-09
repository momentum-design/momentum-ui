/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/audio-player/AudioPlayer";
import { ThemeNameValues } from "@/components/theme/Theme";
import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit-element";

const render = (args: Args) => html`
  <md-theme class="theme-toggle" id="audio" ?darkTheme=${args.darkTheme} theme=${args.theme}>
    <md-audio-player src="https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav"></md-audio-player>
  </md-theme>
`;

export const AudioPlayer: StoryObj = {
  args: {
    theme: "lumos",
    darkTheme: false
  },
  render: render
};

const meta: Meta = {
  title: "Components/Audio Player",
  component: "md-audio-player",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" }
  },
  parameters: {
    a11y: {
      element: "md-audio-player"
    }
  }
};

export default meta;

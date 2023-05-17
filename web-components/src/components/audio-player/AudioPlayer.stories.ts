/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/audio-player/AudioPlayer";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { html } from "lit-element";
import { boolean, withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Components/Audio Player",
  component: "md-audio-player",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-audio-player"
    }
  }
};

export const AudioPlayer = () => {
  const darkTheme = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);

  return html`
    <md-theme class="theme-toggle" id="audio" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-audio-player src="https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav"></md-audio-player>
    </md-theme>
  `;
};

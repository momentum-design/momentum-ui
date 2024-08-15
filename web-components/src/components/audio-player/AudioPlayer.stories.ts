/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/audio-player/AudioPlayer";
import { ThemeNameValues } from "@/components/theme/Theme";
import { boolean, select } from "@storybook/addon-knobs";
import { html } from "lit-element";

export default {
  title: "Components/Audio Player",
  component: "md-audio-player",
  parameters: {
    a11y: {
      element: "md-audio-player"
    }
  }
};

export const AudioPlayer = () => {
  const darkTheme = boolean("darkMode", false);
  const theme = select("Theme name", ThemeNameValues, "lumos");

  return html`
    <md-theme class="theme-toggle" id="audio" ?darkTheme=${darkTheme} theme=${theme}>
      <md-audio-player src="https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav"></md-audio-player>
    </md-theme>
  `;
};

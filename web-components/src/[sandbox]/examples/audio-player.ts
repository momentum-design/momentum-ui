import "@/components/audio-player/AudioPlayer";
import { html } from "lit";

export const audioPlayerTemplate = html`
  <div class="container" style="padding-top: 300px">
    <h3>Basic Audio Player</h3>
    <md-audio-player src="https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav"></md-audio-player>
  </div>
`;

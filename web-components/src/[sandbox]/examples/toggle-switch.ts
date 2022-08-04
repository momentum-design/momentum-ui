import "@/components/toggle-switch/ToggleSwitch";
import { html } from "lit-element";

export const toggleSwitchTemplate = html`
  <md-toggle-switch htmlId="toggleSwitch1">
    Default Toggle Switch
  </md-toggle-switch>
  <md-toggle-switch htmlId="toggleSwitch2" checked>
    Checked Toggle Switch
  </md-toggle-switch>
  <md-toggle-switch htmlId="toggleSwitch3" disabled>
    Disabled Toggle Switch
  </md-toggle-switch>
  <md-toggle-switch htmlId="toggleSwitch4" disabled checked>
    Disabled Checked Toggle Switch
  </md-toggle-switch>
  <md-toggle-switch htmlId="toggleSwitch5" small>
    Small Toggle Switch
  </md-toggle-switch>
  <md-toggle-switch htmlId="toggleSwitch6" small checked>
    Checked Small Toggle Switch
  </md-toggle-switch>
  <md-toggle-switch htmlId="toggleSwitch7" smaller>
    Smaller Toggle Switch
  </md-toggle-switch>
  <md-toggle-switch htmlId="toggleSwitch8" smaller checked>
    Checked Smaller Toggle Switch
  </md-toggle-switch>
  <md-toggle-switch htmlId="toggleSwitch10" alignLabel="right">
    Toggle Switch with label right aligned
  </md-toggle-switch>
  <md-toggle-switch htmlId="toggleSwitch9" alignLabel="left">
    Toggle Switch with label left aligned
  </md-toggle-switch>
`;

import "@/components/radio/Radio";
import "@/components/radio/RadioGroup";
import { html } from "lit-element";

export const radioGroupTemplate = html`
  <h3>Default</h3>
  <md-radiogroup group-label="group_process">
    <md-radio slot="radio" value="Option 1">Option 1</md-radio>
    <md-radio slot="radio" value="Option 2">Option 2</md-radio>
    <md-radio slot="radio" value="Option 3">Option 3</md-radio>
    <md-radio slot="radio" value="Option 4">Option 4</md-radio>
  </md-radiogroup>
  <h3>Horizontal</h3>
  <md-radiogroup group-label="group_process" alignment="horizontal">
    <md-radio slot="radio" value="developing">
      <span>Long Radio description overflowing text with three dots in the end</span>
    </md-radio>
    <md-radio slot="radio" value="Option 1">Option 1</md-radio>
    <md-radio slot="radio" value="Option 2">Option 2</md-radio>
    <md-radio slot="radio" value="Option 3">Option 3</md-radio>
    <md-radio slot="radio" value="developing 2" style="max-width:64px;">
      <span>Long Radio description overflowing text with three dots in the end</span>
    </md-radio>
  </md-radiogroup>
  <h3>Pre-Checked Radio</h3>
  <md-radiogroup group-label="group_process" checked="1">
    <md-radio slot="radio" value="Option 1">Option 1</md-radio>
    <md-radio slot="radio" value="Option 2">Option 2 [Preselected]</md-radio>
    <md-radio slot="radio" value="Option 3">Option 3</md-radio>
    <md-radio slot="radio" value="Option 4">Option 4</md-radio>
  </md-radiogroup>
  <h3>Disabled</h3>
  <md-radiogroup group-label="group_process" checked="2">
    <md-radio slot="radio" value="Option">Option</md-radio>
    <md-radio slot="radio" value="Disabled" disabled>Disabled</md-radio>
    <md-radio slot="radio" value="Option 2 ">Option 2 [Preselected]</md-radio>
    <md-radio slot="radio" value="Disabled 2" disabled>Disabled 2</md-radio>
  </md-radiogroup>
  <h3>Radio buttons with icons</h3>
  <md-radiogroup group-label="group_process">
    <md-radio slot="radio" value="Option 1">
      Option 1
      <md-icon name="info-badge-filled" size="16" iconSet="momentumDesign"></md-icon>
    </md-radio>
    <md-radio slot="radio" value="Option 2">
      Option 2
      <md-tooltip message="Tooltip message" placement="top">
        <md-icon name="info-badge-filled" size="16" iconSet="momentumDesign"></md-icon>
      </md-tooltip>
    </md-radio>
  </md-radiogroup>
`;

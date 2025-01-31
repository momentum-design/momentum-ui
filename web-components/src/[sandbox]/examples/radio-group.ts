import "@/components/icon/Icon";
import "@/components/radio/Radio";
import "@/components/radio/RadioGroup";
import { RadioGroup } from "@/components/radio/RadioGroup";
import "@/components/tooltip/Tooltip";
import { customElement, html, LitElement } from "lit-element";

@customElement("radiogroup-template-sandbox")
export class RadioGroupTemplateSandbox extends LitElement {
  render() {
    return html` <h3>Default</h3>
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
      <md-radiogroup id="pre-checked-radio-group" group-label="group_process" checked="1">
        <md-radio slot="radio" value="Option 1">Option 1</md-radio>
        <md-radio slot="radio" value="Option 2">Option 2 [Preselected]</md-radio>
        <md-radio slot="radio" value="Option 3">Option 3</md-radio>
        <md-radio slot="radio" value="Option 4">Option 4</md-radio>
      </md-radiogroup>
      <md-button
        variant="primary"
        ariaLabel="Clear selection"
        @button-click=${() => {
          const radioGroup = this?.shadowRoot?.querySelector("#pre-checked-radio-group") as RadioGroup.ELEMENT;
          if (radioGroup) {
            radioGroup.clearSelection();
          }
        }}
      >
        <span slot="text">Clear selection</span>
      </md-button>
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
      </md-radiogroup>`;
  }
}

export const radioGroupTemplate = html`
  <h3 class="sandbox-header">Default Favorite</h3>
  <radiogroup-template-sandbox></radiogroup-template-sandbox>
`;

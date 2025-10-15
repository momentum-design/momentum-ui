import "@/components/icon/Icon";
import "@/components/radio/Radio";
import "@/components/radio/RadioGroup";
import { type RadioGroup } from "@/components/radio/RadioGroup";
import "@/components/tooltip/Tooltip";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

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
          <div style="display: flex; align-items: center; gap: 0.25rem;">
            <span> Option 1 </span>
            <md-icon name="info-badge-filled" size="16" iconSet="momentumDesign"></md-icon>
          </div>
        </md-radio>
        <md-radio slot="radio" value="Option 2">
          <div style="display: flex; align-items: center; gap: 0.25rem;">
            <span> Option 2 </span>
            <md-tooltip message="Tooltip message" placement="top">
              <md-icon name="info-badge-filled" size="16" iconSet="momentumDesign"></md-icon>
            </md-tooltip>
          </div>
        </md-radio>
        <md-radio slot="radio" value="Option 2">
          <div style="display: flex; align-items: center; gap: 0.25rem;">
            <span> Option 2 </span>
            <md-tooltip message="Tooltip message" placement="top">
              <md-button variant="ghost" circle size="20">
                <md-icon name="info-badge-filled" size="16" iconSet="momentumDesign"></md-icon>
              </md-button>
            </md-tooltip>
          </div>
        </md-radio>
      </md-radiogroup>

      <h3>Radio buttons with helper text</h3>
      <md-radiogroup group-label="group_process" style="max-width: 400px;">
        <md-radio slot="radio" value="All" message="New messages, AI Assistant suggestions, status changes, and more">
          <div style="display: flex; align-items: center; gap: 0.25rem;">
            <span>All</span>
          </div>
        </md-radio>
        <md-radio slot="radio" hideMessage message="testing" value="Ai only">
          <div style="display: flex; align-items: center; gap: 0.25rem;">
            <span>AI Assistant only</span>
          </div>
        </md-radio>
        <md-radio slot="radio" value="None">
          <div style="display: flex; align-items: center; gap: 0.25rem;">
            <span>None</span>
          </div>
        </md-radio>
      </md-radiogroup>`;
  }
}

export const radioGroupTemplate = html`
  <h3 class="sandbox-header">Default Favorite</h3>
  <radiogroup-template-sandbox></radiogroup-template-sandbox>
`;

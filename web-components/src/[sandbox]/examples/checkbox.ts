import "@/components/checkbox/Checkbox";
import "@/components/checkbox/CheckboxGroup";
import { html } from "lit";

export const checkboxTemplate = html`
  <h3>Default</h3>
  <md-checkbox>Option Item</md-checkbox>
  <h3>Disabled</h3>
  <md-checkbox disabled>Option Item</md-checkbox>
  <h3>Disabled Checked</h3>
  <md-checkbox disabled checked>Option Item</md-checkbox>
  <h3>Indeterminate</h3>
  <md-checkbox indeterminate>Option Item</md-checkbox>
  <h3>Pre-Checked</h3>
  <md-checkbox checked>Option Item</md-checkbox>
  <h3>Default with icon</h3>
    <md-checkbox>
      Option Item  
      <md-icon name="info-badge-filled" size="16" iconSet="momentumDesign"></md-icon>
    </md-checkbox>
    <h3>Default with icon and tooltip</h3>
    <md-checkbox>
      Option Item
      <md-tooltip message="Tooltip message" placement="top">
        <md-icon name="info-badge-filled" size="16" iconSet="momentumDesign"></md-icon>
      </md-tooltip>
    </md-checkbox>
    <h3>Default Group</h3>
    <md-checkboxgroup group-label="group_process">
      <md-checkbox slot="checkbox">Option 1</md-checkbox>
      <md-checkbox slot="checkbox">Option 2</md-checkbox>
      <md-checkbox slot="checkbox">Option 3</md-checkbox>
      <md-checkbox slot="checkbox">Option 4</md-checkbox>
    </md-checkboxgroup>
    <h3>Horizontal Group</h3>
    <md-checkboxgroup group-label="group_process" alignment="horizontal">
      <md-checkbox slot="checkbox">Option 1</md-checkbox>
      <md-checkbox slot="checkbox">Option 2</md-checkbox>
      <md-checkbox slot="checkbox">Option 3</md-checkbox>
      <md-checkbox slot="checkbox">Option 4</md-checkbox>
    </md-checkboxgroup>
    <h3>Disabled Group</h3>
    <md-checkboxgroup group-label="group_process">
      <md-checkbox slot="checkbox">Option 1</md-checkbox>
      <md-checkbox slot="checkbox" disabled>Disabled Option</md-checkbox>
      <md-checkbox slot="checkbox" disabled checked>Disabled & Checked Option</md-checkbox>
      <md-checkbox slot="checkbox">Option 2</md-checkbox>
    </md-checkboxgroup>
    <h3>Indeterminate Group</h3>
    <md-checkboxgroup group-label="group_process">
      <md-checkbox slot="checkbox">Option 1</md-checkbox>
      <md-checkbox slot="checkbox" disabled indeterminate>Disabled Indeterminate Option</md-checkbox>
      <md-checkbox slot="checkbox" disabled checked>Disabled Checked Option</md-checkbox>
      <md-checkbox slot="checkbox" indeterminate>Indeterminate Option</md-checkbox>
    </md-checkboxgroup>
    <h3>Pre-Checked Group</h3>
    <md-checkboxgroup group-label="group_process">
      <md-checkbox slot="checkbox" checked>Checked Option</md-checkbox>
      <md-checkbox slot="checkbox">Option 1</md-checkbox>
      <md-checkbox slot="checkbox" checked>Checked Option</md-checkbox>
      <md-checkbox slot="checkbox">Option 2</md-checkbox>
    </md-checkboxgroup>
    <h3>No label</h3>
    <md-checkboxgroup group-label="no-label">
      <md-checkbox slot="checkbox" checked></md-checkbox>
      <md-checkbox slot="checkbox"></md-checkbox>      
    </md-checkboxgroup>
  </h3>
`;

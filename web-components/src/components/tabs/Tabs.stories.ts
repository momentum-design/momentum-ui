import { withA11y } from "@storybook/addon-a11y";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "./Tab";
import "./TabPanel";
import "./Tabs";

export default {
  title: "Tabs",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-tab"
    }
  }
};

export const HorizontalTabs = () => {
  const heading = text("heading", "Test");
  const disabled = boolean("disabled", false);

  return html`
    <md-tabs>
      <md-tab slot="tab">
        <md-icon name="recents_16"></md-icon>
        <span>Tab 1</span>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "First Tab"</span>
      </md-tab-panel>
      <md-tab slot="tab">
        <md-icon name="apps_16"></md-icon>
        <span>Tab 2</span>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "Second Tab"</span>
      </md-tab-panel>
      <md-tab slot="tab" heading=${heading} .disabled=${disabled}>
        <md-icon name="alarm_16"></md-icon>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "Third Tab"</span>
      </md-tab-panel>
    </md-tabs>
  `;
};

export const VerticalTabs = () => {
  return html`
    <md-tabs direction="vertical">
      <md-tab slot="tab">
        <md-icon name="recents_16"></md-icon>
        <span>Tab 1</span>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "First Tab"</span>
      </md-tab-panel>
      <md-tab slot="tab">
        <md-icon name="apps_16"></md-icon>
        <span>Tab 2</span>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "Second Tab"</span>
      </md-tab-panel>
      <md-tab slot="tab" heading="Test">
        <md-icon name="alarm_16"></md-icon>
      </md-tab>
      <md-tab-panel slot="panel">
        <span>Content for "Third Tab"</span>
      </md-tab-panel>
    </md-tabs>
  `;
};

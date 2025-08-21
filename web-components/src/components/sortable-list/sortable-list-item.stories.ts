import "@/components/icon/Icon";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./sortable-list";
import "./sortable-list-item";

const meta = {
  title: "Advanced Components / Sortable List",
  component: "md-sortable-list"
} satisfies Meta;

export default meta;

type Story = StoryObj;

const render = () => {
  return html`
    <md-sortable-list sort animation="200" style="display: flex; flex-direction: column; gap:8px;">
      <md-sortable-list-item label="Item 1" expandable>
          <md-sortable-list slot="panel" sort animation="200" style="display: flex; flex-direction: column; gap:8px;">
            <md-sortable-list-item label="Sub-item 1">
              <md-icon slot="dragger" name="dragger-horizontal-bold" iconSet="momentumDesign" size="14"></md-icon>
            </md-sortable-list-item>
            <md-sortable-list-item label="Sub-item 2">
              <md-icon slot="dragger" name="dragger-horizontal-bold" iconSet="momentumDesign" size="14"></md-icon>
            </md-sortable-list-item>
          </md-sortable-list>
        </div>
        <md-icon slot="dragger" name="dragger-horizontal-bold" iconSet="momentumDesign" size="14"></md-icon>
      </md-sortable-list-item>
      <md-sortable-list-item label="Item 2" expandable>
        <md-icon slot="dragger" name="dragger-horizontal-bold" iconSet="momentumDesign" size="14"></md-icon>
      </md-sortable-list-item>
      <md-sortable-list-item label="Item 3">
        <md-icon slot="dragger" name="dragger-horizontal-bold" iconSet="momentumDesign" size="14"></md-icon>
        <button slot="trailing-controls">Action</button>
      </md-sortable-list-item>
    </md-sortable-list>
  `;
};

export const SortableList: Story = {
  render
};

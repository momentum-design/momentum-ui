import "@/components/icon/Icon";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./list-v2";
import "./list-item-v2";

const meta = {
  title: "Components/ListV2",
  component: "md-list-v2"
} satisfies Meta;

export default meta;

type Story = StoryObj;

const render = () => {
  return html`
    <md-list-v2>
      <md-list-item-v2 label="Item 1" expandable>
          <md-list-v2 slot="panel" sort animation="200" style="display: flex; flex-direction: column; gap:8px;">
            <md-list-item-v2 label="Sub-item 1"></md-list-item-v2>
            <md-list-item-v2 label="Sub-item 2"></md-list-item-v2>
          </md-list-v2>
        </div>
      </md-list-item-v2>
      <md-list-item-v2 label="Item 2" expandable></md-list-item-v2>
      <md-list-item-v2 label="Item 3">
        <button slot="trailing-controls">Action</button>
      </md-list-item-v2>
    </md-list-v2>
  `;
};

export const Example: Story = {
  render
};

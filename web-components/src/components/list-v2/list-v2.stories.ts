import "@/components/icon/Icon";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./list-v2";
import "./list-item-v2";
import "@/components/chip/Chip";
import { ListV2 } from "./list-v2";

type ListV2Args = {
  gap: ListV2.Gap;
  orientation: ListV2.Orientation;
};

const template = ({ gap, orientation }: ListV2Args) => {
  return html`
    <md-list-v2 gap=${gap} orientation=${orientation}>
      <md-list-item-v2 label="Item 1" expandable variant="inset-rectangle">
          <md-list-v2 slot="panel" @keydown=${(e: KeyboardEvent) => e.stopPropagation()}>
            <md-list-item-v2 label="Sub-item 1"></md-list-item-v2>
            <md-list-item-v2 label="Sub-item 2"></md-list-item-v2>
          </md-list-v2>
        </div>
      </md-list-item-v2>
      <md-list-item-v2 label="Item 2" expandable></md-list-item-v2>
      <md-list-item-v2 label="Item 3">
        <md-chip slot="trailing-controls" value="Completed" color="positive" small></md-chip>
      </md-list-item-v2>
    </md-list-v2>
  `;
};

const meta = {
  title: "Components/List V2",
  component: "md-list-v2",
  subcomponents: { ListItemV2: "md-list-item-v2" },
  argTypes: {
    gap: {
      description: "The gap between list items",
      control: { type: "select" },
      options: ["none", "sm", "md", "lg"]
    },
    orientation: {
      control: { type: "select" },
      options: ["vertical", "horizontal"]
    }
  },
  render: template,
  tags: ["autodocs"]
} satisfies Meta<ListV2Args>;

export default meta;
type Story = StoryObj<ListV2Args>;

export const Example: Story = {
  render: template,
  args: {
    gap: "sm",
    orientation: "vertical"
  }
};

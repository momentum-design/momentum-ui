import "@/components/avatar/Avatar";
import "@/components/checkbox/Checkbox";
import "@/components/chip/Chip";
import "@/components/icon/Icon";
import "@/components/input/Input";
import { action } from "storybook/actions";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./list-item-v2";
import "./list-v2";
import { ListV2 } from "./list-v2";

type ListV2Args = {
  gap: ListV2.Gap;
  orientation: ListV2.Orientation;
};

const template = ({ gap, orientation }: ListV2Args) => {
  return html`
    <md-list-v2 gap=${gap} orientation=${orientation} @list-item-click=${action("list-item-click")}>
      <md-list-item-v2 label="Item 1" expandable variant="inset-rectangle">
          <md-checkbox slot="leading-controls" label="Invite" aria-checked=${false}></md-checkbox>
          <md-avatar slot="leading-controls" size="24" title="Tom Smith" label="Tom Smith" newMomentum></md-avatar>
          <md-list-v2 slot="panel">
            <md-list-item-v2 label="Sub-item 1"></md-list-item-v2>
            <md-list-item-v2 label="Sub-item 2"></md-list-item-v2>
          </md-list-v2>
        </div>
      </md-list-item-v2>
      <md-list-item-v2 label="Item 2" expandable>
        <md-checkbox slot="leading-controls" label="Invite" aria-checked=${false}></md-checkbox>
        <md-avatar slot="leading-controls" size="24" title="Joe Bloggs" label="Joe Bloggs" newMomentum></md-avatar>
        <div slot="panel">
          <md-input multiline></md-input>
        </div>
      </md-list-item-v2>
      <md-list-item-v2 label="Item 3">
        <md-checkbox slot="leading-controls" label="Invite" aria-checked=${false}></md-checkbox>
        <md-avatar slot="leading-controls" size="24" title="Hey Wood" label="Hey Wood" newMomentum></md-avatar>
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

export const NestedExpandables: Story = {
  render: ({ gap, orientation }) => html`
    <md-list-v2 gap=${gap} orientation=${orientation} @list-item-click=${action("list-item-click")}>
      <md-list-item-v2 label="Item 1" expandable variant="inset-rectangle">
          <md-checkbox slot="leading-controls" aria-checked=${false} label="Invite"></md-checkbox>

          <md-list-v2 slot="panel">
            <md-list-item-v2 expandable label="Sub-item 1">
              <md-input multiline slot="panel"></md-input>
            </md-list-item-v2>

            <md-list-item-v2 expandable label="Sub-item 2">
              <div slot="panel">
                <h3>Lorem Ipsum</h3>
                <p>laboris in et deserunt exercitation cupidatat amet est laboris minim</p>
              </div>
            </md-list-item-v2>
          </md-list-v2>

        </div>
      </md-list-item-v2>

      <md-list-item-v2 label="Item 2" expandable>
        <md-checkbox slot="leading-controls" aria-checked=${false} label="Invite"></md-checkbox>
        <div slot="panel">
          <md-input multiline></md-input>
        </div>
      </md-list-item-v2>

      <md-list-item-v2 label="Item 3">
        <md-checkbox slot="leading-controls" aria-checked=${false} label="Invite"></md-checkbox>
        <md-chip slot="trailing-controls" value="Completed" color="positive" small></md-chip>
      </md-list-item-v2>
    </md-list-v2>
  `,
  args: {
    gap: "sm"
  }
};

export const DisabledItems: Story = {
  render: ({ gap, orientation }) =>
    html` <md-list-v2 gap=${gap} orientation=${orientation} @list-item-click=${action("list-item-click")}>
      <md-list-item-v2 label="Item 1"></md-list-item-v2>
      <md-list-item-v2 label="Item 2" disabled></md-list-item-v2>
      <md-list-item-v2 label="Item 3"></md-list-item-v2>
    </md-list-v2>`
};

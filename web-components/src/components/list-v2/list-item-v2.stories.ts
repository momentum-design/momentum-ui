import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { Meta, StoryObj, StoryFn } from "@storybook/web-components";
import "./list-item-v2";
import "@/components/chip/Chip";
import { ListItemV2 } from "./list-item-v2";

type ListItemV2Args = {
  disabled?: boolean;
  expandable?: boolean;
  label?: string;
  expanded?: boolean;
  variant?: ListItemV2.Variant;
};

const meta = {
  title: "Components/List Item V2",
  component: "md-list-item-v2",
  argTypes: {
    disabled: { control: "boolean" },
    variant: {
      control: { type: "select" },
      options: ["full-width", "inset-rectangle", "inset-pill"]
    },
    label: {
      control: { type: "text" }
    },
    expandable: { control: "boolean" },
    expanded: { control: "boolean" }
  },
  tags: ["autodocs"]
} satisfies Meta<ListItemV2Args>;
export default meta;

type Story = StoryObj<ListItemV2Args>;

const PanelContentTemplate = () => html`
  <div slot="panel">
    <h3>Expandable Content</h3>
    <p>
      Lorem ipsum consequat occaecat anim nisi non ipsum amet nulla dolor dolore amet anim culpa dolore quis ut laboris
      commodo ea esse
    </p>
  </div>
`;

const Template: StoryFn = ({ disabled, expandable, label, expanded, variant }) => html`
  <md-list-item-v2
    label=${label}
    ?disabled=${disabled}
    ?expandable=${expandable}
    ?expanded=${expanded}
    variant=${ifDefined(variant)}
  >
    ${PanelContentTemplate()}
  </md-list-item-v2>
`;

export const Default: Story = {
  render: Template,
  args: {
    label: "List Item"
  }
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
    label: "Disabled List Item"
  }
};

export const ExpandableWithTrailingChip: Story = {
  render: ({ disabled, expandable, label, expanded, variant }) => html`
    <md-list-item-v2
      label=${ifDefined(label)}
      ?disabled=${disabled}
      ?expandable=${expandable}
      ?expanded=${expanded}
      variant=${ifDefined(variant)}
    >
      <md-chip slot="trailing-controls" value="Complete" color="positive"></md-chip>
      ${PanelContentTemplate()}
    </md-list-item-v2>
  `,
  args: {
    label: "Expandable List Item",
    expandable: true,
    expanded: false,
    variant: "inset-rectangle"
  }
};

export const OverrideStyles: Story = {
  render: Template,
  args: {
    label: "List Item with Overridden Background",
    expandable: true,
    expanded: true,
    variant: "inset-rectangle"
  },
  decorators: [
    (story) => html`
      <div>
        <style>
          .custom-bg md-list-item-v2 {
            --list-item-bg-color: lightblue;
            --list-item-expand-duration: 100ms;
          }
        </style>
        <div class="custom-bg">${story()}</div>
      </div>
    `
  ],
  parameters: {
    docs: {
      description: {
        story:
          "The following css variables are available to style the component:\n\
* `--list-item-border-radius`\n\
* `--list-item-bg-color`\n\
* `--list-item-expand-duration`\n\
* `--list-item-hover-bg-color`\n\
* `--list-item-active-bg-color`\n\
* `--list-item-text-color`\n\
* `--list-item-disabled-text-color`"
      }
    }
  }
};

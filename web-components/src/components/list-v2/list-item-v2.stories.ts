import "@/components/button/Button";
import "@/components/chip/Chip";
import "@/components/menu-overlay/MenuOverlay";
import { action } from "@storybook/addon-actions";
import { Meta, StoryFn, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "./list-item-v2";
import { ListItemV2 } from "./list-item-v2";
import "./list-v2";

type ListItemV2Args = Partial<{
  disabled: boolean;
  expandable: boolean;
  label: string;
  "secondary-label": string;
  "tertiary-label": string;
  "expand-label": string;
  expanded: boolean;
  variant: ListItemV2.Variant;
}>;

const meta = {
  title: "Components/List Item V2",
  component: "md-list-item-v2",
  argTypes: {
    disabled: { control: "boolean" },
    variant: {
      control: { type: "select" },
      options: ["full-width", "inset-rectangle", "inset-pill"]
    },
    expandable: { control: "boolean" },
    expanded: { control: "boolean" },
    label: { control: "text" },
    "secondary-label": {
      control: "text",
      name: "secondary-label"
    },
    "expand-label": {
      control: "text",
      name: "expand-label"
    },
    "tertiary-label": {
      control: "text",
      name: "tertiary-label"
    }
  },
  tags: ["autodocs"],
  decorators: (story) => html`<div @list-item-click=${action("list-item-click")}>${story()}</div>`
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

const Template: StoryFn = ({ disabled, expandable, label, expanded, variant, ...rest }) => html`
  <md-list-v2>
    <md-list-item-v2
      label=${label}
      secondary-label=${rest["secondary-label"]}
      tertiary-label=${rest["tertiary-label"]}
      expand-label=${rest["expand-label"]}
      ?disabled=${disabled}
      ?expandable=${expandable}
      ?expanded=${expanded}
      variant=${ifDefined(variant)}
    >
      ${PanelContentTemplate()}
    </md-list-item-v2>
  </md-list-v2>
`;

export const Default: Story = {
  render: Template,
  args: {
    label: "List Item",
    "secondary-label": "Secondary Label",
    "tertiary-label": "Tertiary Label"
  }
};

export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
    label: "Disabled List Item"
  }
};

export const ExpandableWithMenuButton: Story = {
  render: ({ disabled, expandable, label, expanded, variant, ...rest }) => html`
    <md-list-v2>
      <md-list-item-v2
        label=${ifDefined(label)}
        secondary-label=${ifDefined(rest["secondary-label"])}
        tertiary-label=${ifDefined(rest["tertiary-label"])}
        expand-label=${ifDefined(rest["expand-label"])}
        ?disabled=${disabled}
        ?expandable=${expandable}
        ?expanded=${expanded}
        variant=${ifDefined(variant)}
      >
        <md-menu-overlay slot="trailing-controls">
          <md-button circle variant="ghost" slot="menu-trigger">
            <md-icon name="more-adr-bold" size="16" iconSet="momentumDesign"></md-icon>
          </md-button>
          <md-list-v2>
            <md-list-item-v2 label="Option 1" variant="inset-rectangle"></md-list-item-v2>
            <md-list-item-v2 label="Option 2" variant="inset-rectangle"></md-list-item-v2>
          </md-list-v2>
        </md-menu-overlay>
        ${PanelContentTemplate()}
      </md-list-item-v2>
    </md-list-v2>
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
* `--list-item-disabled-text-color`\n\
* `--list-item-primary-label-color`\n\
* `--list-item-secondary-label-color`\n\
* `--list-item-tertiary-label-color`\n\
* `--list-item-primary-label-font-size`\n\
* `--list-item-secondary-label-font-size`"
      }
    }
  }
};

import { html, TemplateResult } from "lit-html";
import type { Story, Meta, Args } from "@storybook/web-components";
import "@/components/advance-list/AdvanceList";

const render = (args: Args) => {
  return html`
    <md-advance-list
      .items=${args.items}
      ?isLoading=${args.isLoading}
      ?isMulti=${args.isMulti}
      ?groupOnMultiSelect=${args.groupOnMultiSelect}
      .value=${args.value}
      .disabledItems=${args.disabledItems}
      .containerHeight=${args.containerHeight}
      .totalRecords=${args.totalRecords}
      aria-label-list="Interactive list example"
      @list-item-change=${(e: CustomEvent) => console.log("Selected:", e.detail.selected)}
      @load-more=${() => console.log("Load more items requested")}
    >
    </md-advance-list>
  `;
};

export const AdvanceList = {
  args: {
    items: [1, 2, 3, 4, 5].map((n) => ({
        id: `${n}`,
        name: `Item ${n}`,
        template: (item: any) => html`<div style="padding: 0.5rem">${item.name}</div>`
      })),
    isLoading: false,
    value:[ 1, 2, 3],
    totalRecords: 5,
    containerHeight: "292px"
  },
  render: render
};

const meta: Meta = {
  title: "Components/AdvanceList",
  component: "md-advance-list",
  argTypes: {
    items: {
      control: "object",
      description: "Array of list items with template functions"
    },
    isLoading: {
      control: "boolean",
      description: "Show loading state indicator"
    },
    isMulti: {
      control: "boolean",
      description: "Enable multiple selection mode"
    },
    groupOnMultiSelect: {
      control: "boolean",
      description: "Group selected items in multi-select mode"
    },
    value: {
      control: "array",
      description: "Array of selected item IDs"
    },
    containerHeight: {
      control: "text",
      description: "Height of the scroll container (e.g., '300px')"
    },
    disabledItems: {
      control: "array",
      description: "Array of disabled item IDs"
    },
    totalRecords: {
      control: "number",
      description: "Total records for virtual scroll pagination"
    }
  },
  parameters: {
    a11y: {
      element: "md-advance-list"
    }
  }
};
export default meta;

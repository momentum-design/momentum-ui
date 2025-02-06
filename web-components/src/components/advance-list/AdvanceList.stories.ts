import { html, TemplateResult } from "lit-html";
import type { Story, Meta, Args } from "@storybook/web-components";
import "@/components/advance-list/AdvanceList";
import { action } from "@storybook/addon-actions";

const render = (args: Args): any => {
  return html`
    <md-advance-list
      .items=${args.items}
      ?isLoading=${args.isLoading}
      ?is-multi=${args.isMulti}
      ?groupOnMultiSelect=${args.groupOnMultiSelect}
      .value=${args.value}
      .disabledItems=${args.disabledItems}
      .containerHeight=${args.containerHeight}
      .totalRecords=${args.totalRecords}
      aria-label="Interactive list example"
      @list-item-change=${(e: CustomEvent) =>
        action("Selected")(e.detail.selected)}
      @click=${action("List clicked")}
      @load-more=${action("Load more items requested")}
    >
    </md-advance-list>
  `;
}

export const AdvanceListWithLoader: any = {
  args: {
    items: [1, 2, 3, 4, 5].map((n) => ({
      id: `${n}`,
      name: `Item ${n}`,
      template: (item: any) =>
        html`<div style="padding: 0.5rem">${item.name}</div>`,
    })).concat({
      id: "status-indicator",
      name: "loading",
      template: () =>
        html`<div class="infinite-scroll-spinner" part="spinner"><md-spinner size="18"></md-spinner></div>`
    }),
    isLoading: true,
    isMulti: false, // Default value
    groupOnMultiSelect: false,
    value: [ ],
    totalRecords: 100,
    containerHeight: "400px",
    disabledItems: [],
    isError: false
  },
  render: render,
};

export const AdvanceList: any = {
  args: {
    items: [1, 2, 3, 4, 5].map((n) => ({
      id: `${n}`,
      name: `Item ${n}`,
      template: (item: any) =>
        html`<div style="padding: 0.5rem">${item.name}</div>`,
    })),
    isLoading: false,
    isMulti: false, // Default value
    groupOnMultiSelect: false,
    value: [ ],
    totalRecords: 100,
    containerHeight: "400px",
    disabledItems: [],
    isError: false
  },
  render: render,
};

const meta: Meta = {
  title: "Components/AdvanceList",
  component: "md-advance-list",
  argTypes: {
    items: {
      control: "object",
      description: "Array of list items with template functions",
    },
    isLoading: { table: { disable: true } },
    isMulti: {
      control: "boolean",
      description: "Enable multiple selection mode",
    },
    groupOnMultiSelect: { table: { disable: true } },
    value: {
      control: "array",
      description: "Array of selected item IDs",
    },
    containerHeight: {
      control: "text",
      description: "Height of the scroll container (e.g., '300px')",
    },
    disabledItems: { table: { disable: true } },
    totalRecords: {
      control: "number",
      description: "Total records for virtual scroll pagination",
    },
    handleKeyDown: { table: { disable: true } },
    handleRangeChange: { table: { disable: true } },
    isError: { table: { disable: true } },
    lastSelectedIdByOrder: { table: { disable: true } },
    lists: { table: { disable: true } },
    listContainer: { table: { disable: true } },
    scrollIndex: { table: { disable: true } },
    activeId: { table: { disable: true } },
    isUserNavigated: { table: { disable: true } },
    selectedItemsIds: { table: { disable: true } },
    selectAllItems: { table: { disable: true } }

  },
  parameters: {
    a11y: {
      element: "md-advance-list",
    },
  },
};
export default meta;

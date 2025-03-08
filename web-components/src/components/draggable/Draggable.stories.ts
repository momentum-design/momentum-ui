/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import "@/components/draggable/Draggable";
import "@/components/draggable/DraggableItem";
import "@/components/icon/Icon";
import { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { GroupOptions } from "sortablejs";
import mdx from "./Draggable.mdx";

const meta: Meta = {
  title: "Components/Draggable",
  component: "md-draggable",
  argTypes: {
    leftSort: { control: "boolean", description: "Allow sorting inside left draggable list" },
    leftDisabled: { control: "boolean", description: "Disables the left sortable" },
    leftFiltered: {
      control: "text",
      description: "Left list items that will be filtered out"
    },
    leftGroupName: { control: "text", description: "Group name" },
    leftGroupPull: {
      control: { type: "select" },
      options: ["clone", true, false, ["shared-list"]],
      description: "Select pull option"
    },
    leftGroupPut: {
      control: { type: "select" },
      options: [true, false, ["shared-list"]],
      description: "Select left put option"
    },
    leftHandle: {
      control: "text",
      description: "Drag handle selector within left list items"
    },
    rightSort: { control: "boolean", description: "Allow sorting inside right draggable list" },
    rightDisabled: { control: "boolean", description: "Disables the right sortable" },
    rightFiltered: {
      control: "text",
      description: "Right list items that will be filtered out"
    },
    rightGroupName: { control: "text", description: "Group name" },
    rightGroupPull: {
      control: { type: "select" },
      options: ["clone", true, false, ["shared-list"]],
      description: "Select pull option"
    },
    rightGroupPut: {
      control: { type: "select" },
      options: [true, false, ["shared-list"]],
      description: "Select right put option"
    },
    rightHandle: {
      control: "text",
      description: "Drag handle selector within right list items"
    },
    ghostClass: { control: "color", description: "Class name for the drop placeholder" },
    chooseClass: { control: "color", description: "Class name for the chosen item" }
  },
  parameters: {
    docs: {
      page: mdx
    },
    a11y: {
      element: "md-draggable"
    },
    parameters: {
      description: {
        component: "For more information please look: https://sortablejs.github.io/Sortable/"
      }
    }
  }
};

export default meta;

const render = (args: Args) => {
  return html`
    <style>
      md-draggable-item {
        border: 1px solid rgba(0, 0, 0, 0.125);
        display: flex;
        justify-content: center;
        padding: 0.5rem 1rem;
        position: relative;
      }

      md-draggable-item[disabled] {
        background-color: #dc3545;
      }

      .custom-ghost {
        background-color: ${args.ghostClass};
      }

      .custom-choose {
        border: 3px dashed ${args.chooseClass};
      }

      .draggable-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
      }

      md-icon[name="icon-drag_16"] {
        margin-right: 10px;
      }
    </style>
    <div class="draggable-wrapper">
      <md-draggable
        ?sort=${args.leftSort}
        ?disabled=${args.leftDisabled}
        .filter=${args.leftFiltered}
        .handle=${args.leftHandle}
        .group=${{
          name: args.leftGroupName,
          pull: args.leftGroupPull as unknown,
          put: args.leftGroupPut as unknown
        } as GroupOptions}
        ghost-class="custom-ghost"
        chosen-class="custom-choose"
        draggable-items="md-draggable-item"
      >
        <md-draggable-item slot="draggable-item"
          ><md-icon name="icon-drag_16"></md-icon>Sortable Item1 (Handle)</md-draggable-item
        >
        <md-draggable-item slot="draggable-item" disabled>Sortable Item2 (Disabled)</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item3</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item4</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item5</md-draggable-item>
      </md-draggable>

      <md-draggable
        ?sort=${args.rightSort}
        ?disabled=${args.rightDisabled}
        .filter=${args.rightFiltered}
        .handle=${args.rightHandle}
        .group=${{
          name: args.rightGroupName,
          pull: args.rightGroupPull as unknown,
          put: args.rightGroupPut as unknown
        } as GroupOptions}
        ghost-class="custom-ghost"
        chosen-class="custom-choose"
        draggable-items="md-draggable-item"
      >
        <md-draggable-item slot="draggable-item">Sortable Item6</md-draggable-item>
        <md-draggable-item slot="draggable-item"
          ><md-icon name="icon-drag_16"></md-icon>Sortable Item7 (Handle)</md-draggable-item
        >
        <md-draggable-item slot="draggable-item">Sortable Item8</md-draggable-item>
        <md-draggable-item slot="draggable-item" disabled>Sortable Item9 (Disabled)</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item10</md-draggable-item>
      </md-draggable>
    </div>
  `;
};

export const Draggable: StoryObj = {
  args: {
    leftSort: false,
    leftDisabled: false,
    leftFiltered: "md-draggable-item[disabled]",
    leftGroupName: "shared-list",
    leftGroupPull: "clone",
    leftGroupPut: true,
    leftHandle: "md-draggable-item",
    rightSort: false,
    rightDisabled: false,
    rightFiltered: "md-draggable-item[disabled]",
    rightGroupName: "shared-list",
    rightGroupPull: "clone",
    rightGroupPut: true,
    rightHandle: "md-draggable-item",
    ghostClass: "#c8ebfb",
    chooseClass: "#ddc74e"
  },
  render: render
};

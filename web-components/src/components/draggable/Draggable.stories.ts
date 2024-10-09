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
import { ThemeNameValues } from "@/components/theme/Theme";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";
import { GroupOptions } from "sortablejs";
import mdx from "./Draggable.mdx";

export default {
  title: "Components/Draggable",
  component: "md-draggable",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    leftSort: { control: "boolean", description: "Allow sorting inside left draggable list", defaultValue: false },
    leftDisabled: { control: "boolean", description: "Disables the left sortable", defaultValue: false },
    leftFiltered: {
      control: "text",
      description: "Left list items that will be filtered out",
      defaultValue: "md-draggable-item[disabled]"
    },
    leftGroupName: { control: "text", description: "Group name", defaultValue: "shared-list" },
    leftGroupPull: {
      control: { type: "select", options: ["clone", true, false, ["shared-list"]] },
      description: "Select pull option",
      defaultValue: "clone"
    },
    leftGroupPut: {
      control: { type: "select", options: [true, false, ["shared-list"]] },
      description: "Select left put option",
      defaultValue: true
    },
    leftHandle: {
      control: "text",
      description: "Drag handle selector within left list items",
      defaultValue: "md-draggable-item"
    },
    rightSort: { control: "boolean", description: "Allow sorting inside right draggable list", defaultValue: false },
    rightDisabled: { control: "boolean", description: "Disables the right sortable", defaultValue: false },
    rightFiltered: {
      control: "text",
      description: "Right list items that will be filtered out",
      defaultValue: "md-draggable-item[disabled]"
    },
    rightGroupName: { control: "text", description: "Group name", defaultValue: "shared-list" },
    rightGroupPull: {
      control: { type: "select", options: ["clone", true, false, ["shared-list"]] },
      description: "Select pull option",
      defaultValue: "clone"
    },
    rightGroupPut: {
      control: { type: "select", options: [true, false, ["shared-list"]] },
      description: "Select right put option",
      defaultValue: true
    },
    rightHandle: {
      control: "text",
      description: "Drag handle selector within right list items",
      defaultValue: "md-draggable-item"
    },
    ghostClass: { control: "color", description: "Class name for the drop placeholder", defaultValue: "#c8ebfb" },
    chooseClass: { control: "color", description: "Class name for the chosen item", defaultValue: "#ddc74e" }
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

export const Draggable = (args: Args) => {
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
    <md-theme class="theme-toggle" ?darkTheme=${args.darkTheme} theme=${args.theme}>
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
    </md-theme>
  `;
};

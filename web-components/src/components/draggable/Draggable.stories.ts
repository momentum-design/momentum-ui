/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import { boolean, withKnobs, color } from "@storybook/addon-knobs";
import "@/components/draggable/Draggable";
import "@/components/draggable/DraggableItem";
import { html } from "lit-element";

export default {
  title: "Draggable",
  component: "md-draggable",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-draggable"
    },
    docs: {
      description: {
        component: "For more information please look: https://sortablejs.github.io/Sortable/"
      }
    }
  }
};

export const SortableDraggable = () => {
  const darkTheme = boolean("Dark Mode", false);
  const lumos = boolean("Lumos Theme", false);

  const sort = boolean("Allow sorting inside draggable list", false);
  const ghostClass = color("Class name for the drop placeholder", "#c8ebfb");
  const chooseClass = color("Class name for the chosen item", "#ddc74e");

  return html`
    <style>
      md-draggable-item {
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.125);
        display: block;
        margin-bottom: -1px;
        padding: 0.5rem 1rem;
        position: relative;
        text-align: center;
        background: #dce0e0;
      }

      .custom-ghost {
        background-color: ${ghostClass};
      }

      .custom-choose {
        background-color: ${chooseClass};
      }
    </style>
    <md-theme class="theme-toggle" ?darkTheme=${darkTheme} ?lumos=${lumos}>
      <md-draggable
        ?sort=${sort}
        ghost-class="custom-ghost"
        chosen-class="custom-choose"
        draggable-items="md-draggable-item"
      >
        <md-draggable-item slot="draggable-item">Sortable Item1</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item2</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item3</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item4</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item5</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item6</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item7</md-draggable-item>
      </md-draggable>
    </md-theme>
  `;
};

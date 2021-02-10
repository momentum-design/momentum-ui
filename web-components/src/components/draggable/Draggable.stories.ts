/**
 * Copyright (c) Cisco Systems, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { html } from "lit-element";
import "@/components/draggable/Draggable";
import "@/components/checkbox/Checkbox";
import "@/components/checkbox/CheckboxGroup";
import "@/components/theme/Theme";
import { GroupOptions } from "sortablejs";

export default {
  title: "Draggable",
  component: "md-draggable",
  decorators: [withKnobs, withA11y],
  argTypes: {
    popper: { table: { disable: true } },
    coachClassMap: { table: { disable: true } }
  },
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

const options = {
  Sorting: "sorting",
  Draggable: "draggable"
};

export const Draggable = () => {
  const dark = boolean("Dark Mode", false);
  const lumos = boolean("Lumos Theme", false);
  const dragType = select("Draggable Type", options, "sorting");

  if (dragType === "sorting") {
    return html`
      <md-theme class="theme-toggle" id="draggable" ?darkTheme=${dark} ?lumos=${lumos}>
        <md-draggable
          draggable-items="md-list-item"
          ghost-class="sorting"
          style="padding: 15px;"
          @drag-start=${action("start")}
          @drag-move=${action("move")}
          @drag-end=${action("end")}
          @drag-change=${action("change")}
          @drag-choose=${action("choose")}
        >
          <md-list label="Transuranium elements">
            <md-list-item slot="list-item">Neptunium</md-list-item>
            <md-list-item slot="list-item">Plutonium</md-list-item>
            <md-list-item slot="list-item">Americium</md-list-item>
            <md-list-item slot="list-item">Curium</md-list-item>
            <md-list-item slot="list-item">Berkelium</md-list-item>
            <md-list-item slot="list-item">Californium</md-list-item>
          </md-list>
        </md-draggable>
      </md-theme>
    `;
  } else {
    return html`
      <md-theme class="theme-toggle" id="draggable-drag" ?darkTheme=${dark}>
        <div class="shared-draggable-wrapper">
          <md-draggable
            draggable-items="md-list-item"
            .group=${{ name: "md-list", pull: "clone" } as GroupOptions}
            filter="md-list-item[disabled]"
          >
            <md-list label="Transuranium elements">
              <md-list-item slot="list-item">
                <md-icon name="tag_16"></md-icon>
                Average CSAT Scores
              </md-list-item>
              <md-list-item slot="list-item">
                <md-icon name="tag_16"></md-icon>
                Average Handle Time
              </md-list-item>
              <md-list-item slot="list-item">
                <md-icon name="tag_16"></md-icon>
                Total Contacts Handled
              </md-list-item>
              <md-list-item slot="list-item">
                <md-icon name="tag_16"></md-icon>
                Internal Filter
              </md-list-item>
              <md-list-item slot="list-item">
                <md-icon name="tag_16"></md-icon>
                Custom Filter
              </md-list-item>
              <md-list-item slot="list-item">
                <md-icon name="tag_16"></md-icon>
                Test Filter
              </md-list-item>
            </md-list>
          </md-draggable>
          <md-draggable
            draggable-items="md-list-item"
            .group=${{ name: "md-list", pull: "clone" } as GroupOptions}
            filter="md-list-item[disabled]"
          >
            <md-list label="Transuranium elements">
              <md-list-item slot="list-item">
                <md-icon name="tag_16"></md-icon>
                Internal Filter 1
              </md-list-item>
              <md-list-item slot="list-item">
                <md-icon name="tag_16"></md-icon>
                Custom Filter 2
              </md-list-item>
              <md-list-item slot="list-item">
                <md-icon name="tag_16"></md-icon>
                Test Filter 1
              </md-list-item>
            </md-list>
          </md-draggable>
        </div>
      </md-theme>
    `;
  }
};

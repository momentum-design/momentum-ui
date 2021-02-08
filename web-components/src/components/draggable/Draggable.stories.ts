import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';
import { html } from "lit-element";
import { badgeColor, coachPlacement } from "@/utils/enums";
import "@/components/draggable/Draggable";
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
    }
  }
};

const options = {
  Sorting: "sorting",
  Draggable: "draggable"
};

export const Draggable = () => {
  const dark = boolean("darkMode", false);
  const lumos = boolean("Lumos Theme", false);
  const dragType = select("Draggable Type", options, "sorting");

  if (dragType === "sorting") {
    return html`
      <md-theme class="theme-toggle" id="draggable" ?darkTheme=${dark} ?lumos=${lumos}>
        <md-draggable
          draggable-items="md-list-item"
          ghost-class="sorting"
          style="padding: 15px;">
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
            draggable-items="md-checkbox"
            .group=${{ name: "checkbox-group", pull: "clone" } as GroupOptions}
            ghost-class="ghost"
            filter="md-checkbox[disabled]"
            handle="md-icon"
          >
            <md-checkboxgroup group-label="group_process">
              <md-checkbox slot="checkbox"><md-icon name="icon-drag_16"></md-icon>Left Option1</md-checkbox>
              <md-checkbox slot="checkbox" disabled><md-icon name="icon-drag_16"></md-icon>Left Option2</md-checkbox>
              <md-checkbox slot="checkbox"><md-icon name="icon-drag_16"></md-icon>Left Option3</md-checkbox>
              <md-checkbox slot="checkbox"><md-icon name="icon-drag_16"></md-icon>Left Option4</md-checkbox>
            </md-checkboxgroup>
          </md-draggable>
          <md-draggable
            draggable-items="md-checkbox"
            .group=${{ name: "checkbox-group", pull: "clone" } as GroupOptions}
            ghost-class="ghost"
            filter="md-checkbox[disabled]"
          >
            <md-checkboxgroup group-label="group_process">
              <md-checkbox slot="checkbox">Right Option1</md-checkbox>
              <md-checkbox slot="checkbox">Right Option2</md-checkbox>
              <md-checkbox slot="checkbox" disabled>Right Option3</md-checkbox>
              <md-checkbox slot="checkbox">Right Option4</md-checkbox>
            </md-checkboxgroup>
          </md-draggable>
        </div>
        
      </md-theme>
    `;
  }
};

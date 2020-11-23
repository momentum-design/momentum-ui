import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import "@/components/activity-button/ActivityButton";
import { activityButtonSize, activityButtonType } from "@/components/activity-button/ActivityButton";

export default {
  title: "Activity Button",
  component: "md-activity-button",
  decorators: [withKnobs, withA11y],
  argTypes: {
    label: {
      description: 'overwritten description',
      table: {
        type: { 
            summary: 'string', 
            detail: 'something really really long' 
        },
      }
    },
    buttonToIconSizeMapping: { table: { disable: true } },
    formatClass: { table: { disable: true } },
  },
  parameters: {
    a11y: {
      element: "md-activity-button"
    },
    docs: { 
      description: { 
        component: 'some component description' 
      },
    }
  }
};

export const DefaultActivityButton = () => {
  const darkTheme = boolean("darkMode", false);
  const label = text("Title", "");
  const labelSize = "Size";
  const defaultValue = 68;
  const size = select(labelSize, activityButtonSize, defaultValue);
  const labelType = "Type";
  const defaultTypeValue = "meetings";
  const type = select(labelType, activityButtonType, defaultTypeValue);
  const disabled = boolean("Disabled", false);

  return html`
  <md-theme class="theme-toggle" id="activity-button" ?darkTheme=${darkTheme}>
    <md-activity-button ariaLabel="${label}" .label="${label}" .type="${type}" .size="${size}" ?disabled="${disabled}"></md-activity-button>
  </md-theme>
  `;
}
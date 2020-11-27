import "./FloatingModal";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import "@/components/radio/Radio";
import "@/components/radio/RadioGroup";
import { html } from "lit-element";

export default {
  title: "FloatingModal",
  component: "md-floating-modal",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-floating-modal"
    }
  }
};

export const FloatingModal = () => {
  const show = boolean("show", false);
  const full = boolean("full-screen", false);
  const fixed = boolean("fixed-strategy", false)

  return html`
    <md-floating-modal ?show=${show} ?full-screen=${full} ?fixed-strategy=${fixed}>
      <md-radiogroup group-label="group_process">
        <md-radio slot="radio" value="Option 1">Option 1</md-radio>
        <md-radio slot="radio" value="Option 2">Option 2</md-radio>
        <md-radio slot="radio" value="Option 3">Option 3</md-radio>
        <md-radio slot="radio" value="Option 4">Option 4</md-radio>
      </md-radiogroup>
    </md-floating-modal>
  `;
};

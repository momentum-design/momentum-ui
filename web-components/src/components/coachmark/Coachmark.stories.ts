import "@/components/coachmark/Coachmark";
import { badgeColor, coachPlacement } from "@/utils/enums";
import { action } from "storybook/actions";
import { Args, StoryObj } from "@storybook/web-components";
import { html } from "lit";

export default {
  title: "Components/Coachmark",
  component: "md-coachmark",
  argTypes: {
    popper: { table: { disable: true } },
    reference: { table: { disable: true } },
    coachWrapClassMap: { table: { disable: true } },
    coachClassMap: { table: { disable: true } },
    show: { control: "boolean", defaultValue: false },
    color: { control: { type: "select" }, options: badgeColor, defaultValue: "default" },
    placement: { control: { type: "select" }, options: coachPlacement, defaultValue: "right" }
  },
  parameters: {
    a11y: {
      context: "md-coachmark"
    }
  }
};

const render = (args: Args) => {
  return html`
    <md-coachmark
      ?show=${args.show}
      .placement="${args.placement}"
      .color="${args.color}"
      @coach-create=${action("coach-create")}
    >
      <div slot="coachmark-content">
        <span>Coachmark test content</span>
        <md-button slot="coachmark-content">Coachmark next</md-button>
      </div>
      <md-button>Coachmark Default</md-button>
    </md-coachmark>
  `;
};

export const Coachmark: StoryObj = {
  args: {
    color: "default",
    placement: "right"
  },
  render: render
};

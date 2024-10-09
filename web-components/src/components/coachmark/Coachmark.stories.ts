import "@/components/coachmark/Coachmark";
import { ThemeNameValues } from "@/components/theme/Theme";
import { badgeColor, coachPlacement } from "@/utils/enums";
import { action } from "@storybook/addon-actions";
import { Args } from "@storybook/web-components";
import { html } from "lit-element";

export default {
  title: "Components/Coachmark",
  component: "md-coachmark",
  argTypes: {
    popper: { table: { disable: true } },
    reference: { table: { disable: true } },
    coachWrapClassMap: { table: { disable: true } },
    coachClassMap: { table: { disable: true } },
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean", defaultValue: false },
    show: { control: "boolean", defaultValue: false },
    color: { control: { type: "select", options: badgeColor }, defaultValue: "default" },
    placement: { control: { type: "select", options: coachPlacement }, defaultValue: "right" }
  },
  parameters: {
    a11y: {
      element: "md-coachmark"
    }
  }
};

export const Coachmark = (args: Args) => {
  return html`
    <md-theme .darkTheme=${args.darkTheme} theme=${args.theme}>
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
    </md-theme>
  `;
};

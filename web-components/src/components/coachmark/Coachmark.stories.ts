import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';
import { html } from "lit-element";
import { badgeColor, coachPlacement } from "@/utils/enums";
import "@/components/coachmark/Coachmark";
import "@/components/theme/Theme";
import { ThemeNameValues } from "@/components/theme/Theme";

export default {
  title: "Components/Coachmark",
  component: "md-coachmark",
  decorators: [withKnobs, withA11y],
  argTypes: {
    popper: { table: { disable: true } },
    reference: { table: { disable: true } },
    coachWrapClassMap: { table: { disable: true } },
    coachClassMap: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-coachmark"
    }
  }
};

export const Coachmark = () => {
  const dark = boolean("Dark Theme", false);
  const lumos = boolean("Lumos Theme", false);
  const theme = select("Theme name", ThemeNameValues, "");
  const show = boolean("Open", false);
  const color = select("Color", badgeColor, "default");
  const placement = select("Placement", coachPlacement , "right");

  return html`
  <md-theme .darkTheme=${dark} .lumos=${lumos} theme=${theme}>
    <md-coachmark ?show=${show} .placement="${placement}" .color="${color}" @coach-create=${(action('coach-create'))}>
        <div slot="coachmark-content">
          <span>Coachmark  test content</span>
          <md-button slot="coachmark-content">Coachmark next</md-button>
        </div>
        <md-button>Coachmark Default</md-button>
      </md-coachmark>
  </md-theme>
  `;
};






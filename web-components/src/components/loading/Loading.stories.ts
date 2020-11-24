import "@/components/loading/Loading";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { select, boolean, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-element";
import { LoadingSize } from "@/components/loading/Loading";

export default {
  title: "Loading",
  component: "md-loading",
  decorators: [withKnobs, withA11y],
  argTypes: {
    loadingClassMap: { table: { disable: true } }
  },
  parameters: {
    a11y: {
      element: "md-loading"
    }
  }
};

const options = {
    Small: "small",
    Middle: "middle",
    Large: "large",
    None: ""
  };

export const Loading = () => {
  const darkTheme = boolean("darkMode", false);
  const size = select("Size", options, "small");

  return html`
    <md-theme class="theme-toggle" id="loading" ?darkTheme=${darkTheme}>
      <md-loading .size=${size as LoadingSize}></md-loading>
    </md-theme>   
  `;
};

import "./Breadcrumb";
import { withA11y } from "@storybook/addon-a11y";
import { html } from "lit-element";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import "../theme/Theme";

export default {
  title: "Breadcrumb",
  component: "md-breadcrumb",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-breadcrumb"
    }
  }
};

const breadCrumb = [
  {
    link: "/one",
    label: "One"
  },
  {
    link: "/two",
    label: "Two"
  },
  {
    link: "/three",
    label: "Three"
  },
  {
    link: "/four",
    label: "Four"
  }
];

export const Default = () => {
  const darkTheme = boolean("darkMode", false);
  
  return html`
    <md-theme class="theme-toggle" id="alert-banner" ?darkTheme=${darkTheme}>
      <md-breadcrumb .navCrumbs="${breadCrumb}"></md-breadcrumb>
    </md-theme>
  `;
}
  
  

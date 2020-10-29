import "@/components/button/Button";
import "@/components/checkbox/Checkbox";
import "@/components/input/Input";
import "@/components/theme/Theme";
import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import "./MenuOverlay";
import { menuOverlayPlacement, menuOverlaySize } from "./MenuOverlay";

export default {
  title: "Menu Overlay",
  component: "md-menu-overlay",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-menu-overlay"
    }
  }
};

export const Default = () => {
  const darkTheme = boolean("darkMode", false);
  const isOpen = boolean("isOpen", false);
  const placement = select("placement", menuOverlayPlacement, "bottom");
  const size = select("size", menuOverlaySize, "large");
  const maxHeight = text("max height", "");
  const customWidth = text("custom width", "");

  return html`
    <md-theme class="theme-toggle" id="menu-overlay" ?darkTheme=${darkTheme}>
      <md-menu-overlay
        style="margin: 10rem"
        placement=${placement}
        size=${size}
        max-height=${maxHeight}
        custom-width=${customWidth}
        ?is-open=${isOpen}
      >
        <md-button slot="menu-trigger" variant="primary">Open Menu Overlay</md-button>
        <div style="padding:1.25rem ; width: 100%;">
          <md-input
            htmlId="inputSearchClearPill"
            containerSize="small-12"
            placeholder="Enter Text"
            shape="pill"
            clear
          ></md-input>
          <md-checkbox>Default Checkbox</md-checkbox>
          <md-checkbox checked>Default Checked Checkbox</md-checkbox>
          <md-checkbox indeterminate>Default Indeterminate Checkbox</md-checkbox>
          <div style="text-align: center">
            <p style="margin-bottom: .5rem">Please complete the entire form</p>
            <md-button variant="primary">Submit</md-button>
          </div>
        </div>
      </md-menu-overlay>
    </md-theme>
  `;
};

export const ShowArrow = () => {
  const darkTheme = boolean("darkMode", false);
  const placement = select("placement", menuOverlayPlacement, "bottom");

  return html`
    <md-theme class="theme-toggle" id="menu-overlay" ?darkTheme=${darkTheme}>
      <md-menu-overlay style="margin: 20rem" placement=${placement} show-arrow is-open>
        <md-button style="margin: 25rem" slot="menu-trigger" variant="primary">Open Menu Overlay</md-button>
        <div style="padding:1.25rem ; width: 100%;">
          <md-input
            htmlId="inputSearchClearPill"
            containerSize="small-12"
            placeholder="Enter Text"
            shape="pill"
            clear
          ></md-input>
          <md-checkbox>Default Checkbox</md-checkbox>
          <md-checkbox checked>Default Checked Checkbox</md-checkbox>
          <md-checkbox indeterminate>Default Indeterminate Checkbox</md-checkbox>
          <div style="text-align: center">
            <p style="margin-bottom: .5rem">Please complete the entire form</p>
            <md-button variant="primary">Submit</md-button>
          </div>
        </div>
      </md-menu-overlay>
    </md-theme>
  `;
};

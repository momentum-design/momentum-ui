import { withA11y } from "@storybook/addon-a11y";
import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import { html } from "lit-html";
import "./Link";
import {linkTag } from "./Link";

export default {
  title: "Link",
  component: "md-link",
  decorators: [withKnobs, withA11y],
  parameters: {
    a11y: {
      element: "md-link"
    }
  }
};

const darkTheme = boolean("Dark Mode", false);
export const Default = () => {
  return html`
    <md-theme class="theme-toggle" id="link" ?darkTheme=${darkTheme}>
      <md-link>Default Link</md-link>
    </md-theme>
  `;
};

export const HTMLTag = () => {
  const tag = select("HTML Tag", linkTag, "a");
  return html`
   
    <md-theme class="theme-toggle" id="link" ?darkTheme=${darkTheme}>
      <md-link href="http://google.com" .tag=${tag} >Link</md-link>
    </md-theme>
  `;

};
export const Href = () => {
  const href = text("href", "http://google.com");

  return html`
    <md-theme class="theme-toggle" id="link" ?darkTheme=${darkTheme}>
      <md-link .href=${href}>Link</md-link>
    </md-theme>
  `;
};

export const Disabled = () => {
  const disabled = boolean("Disabled", true);

  return html`
    <md-theme class="theme-toggle" id="link" ?darkTheme=${darkTheme}>
     <md-link ?disabled=${disabled}>Link</md-link>
    </md-theme>
  `;
};
export const Inline = () => {
  const inline = boolean("Link Inline", true);

  return html`
    <md-theme class="theme-toggle" id="link" ?darkTheme=${darkTheme}>
     <md-link ?inline=${inline}>Link</md-link>
    </md-theme>
  `;
};



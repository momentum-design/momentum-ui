import { ThemeNameValues } from "@/components/theme/Theme";
import type { Args, Meta, StoryObj } from "@storybook/web-components";

import { html } from "lit-element";
import "./Accordion";
import mdx from "./Accordion.mdx";
import "./AccordionItem";

const render = (args: Args) => html`
  <md-theme class="theme-toggle" id="activity-button" ?darkTheme=${args.darkTheme} theme=${args.theme}>
    <md-accordion ?multiple=${args.multiple}>
      <md-accordion-item slot="accordion-item" label="Header №1" ?expanded=${args.expanded}>
        <div>Panel №1</div>
      </md-accordion-item>
      <md-accordion-item slot="accordion-item" label="Header №2" ?disabled=${args.disabled}>
        <div>Panel №2</div>
      </md-accordion-item>
      <md-accordion-item slot="accordion-item" label="Header №3">
        <div>Panel №3</div>
      </md-accordion-item>
    </md-accordion>
  </md-theme>
`;

export const Accordion: StoryObj = {
  args: {
    theme: "lumos",
    darkTheme: false
  },
  render: render
};

const meta: Meta = {
  title: "Components/Accordion",
  component: "md-accordion",
  argTypes: {
    theme: { control: { type: "select", options: ThemeNameValues }, defaultValue: "lumos" },
    darkTheme: { control: "boolean" }
  },
  parameters: {
    a11y: {
      element: "md-accordion"
    },
    docs: {
      page: mdx
    }
  }
};

export default meta;

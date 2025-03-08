import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./Accordion";
import mdx from "./Accordion.mdx";
import "./AccordionItem";

const render = (args: Args) => html`
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
`;

export const Accordion: StoryObj = {
  args: {},
  render: render
};

const meta: Meta = {
  title: "Components/Accordion",
  component: "md-accordion",
  argTypes: {},
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

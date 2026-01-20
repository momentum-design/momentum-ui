import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./Accordion";
import { Accordion as AccordionEl } from "./Accordion";
import "./AccordionItem";

const Template = ({ disabled, expanded, multiple, suppressContainerFocus }: Args) => {
  return html`<md-accordion ?multiple=${multiple} ?suppress-container-focus=${suppressContainerFocus}>
    <md-accordion-item slot="accordion-item" label="Header №1" ?expanded=${expanded}>
      <div>Panel №1</div>
    </md-accordion-item>
    <md-accordion-item slot="accordion-item" label="Header №2" ?disabled=${disabled}>
      <div>Panel №2</div>
    </md-accordion-item>
    <md-accordion-item slot="accordion-item" label="Header №3">
      <div>Panel №3</div>
    </md-accordion-item>
  </md-accordion>`;
};

type Story = StoryObj<AccordionEl.ELEMENT>;

export const Accordion: Story = {
  args: {
    multiple: false,
    suppressContainerFocus: true
  },
  render: Template
};

export const MultiSelectAccordion: Story = {
  args: {
    multiple: true,
    suppressContainerFocus: true
  },
  render: Template
};

const meta: Meta = {
  title: "Components/Accordion",
  component: "md-accordion",
  argTypes: {},
  tags: ["autodocs"],
  parameters: {
    a11y: {
      element: "md-accordion"
    }
  }
};

export default meta;

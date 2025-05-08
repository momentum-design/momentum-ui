import type { Args, Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./Accordion";
import mdx from "./Accordion.mdx";
import "./AccordionItem";
import { Accordion as AccordionEl } from "./Accordion";

const Template = ({ disabled, expanded, gap, disableCustomGap, multiple, suppressFocusableContainer }: Args) => {
  if (disableCustomGap) gap = undefined;
  return html`<md-accordion ?multiple=${multiple} ?suppressfocusablecontainer=${suppressFocusableContainer} gap=${gap}>
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
    suppressFocusableContainer: true
  },
  render: Template
};

export const MultiSelectAccordion: Story = {
  args: {
    multiple: true,
    suppressFocusableContainer: true,
  },
  render: Template
};

const meta: Meta = {
  title: "Components/Accordion",
  argTypes: {
    disableCustomGap: {
      control: { type: "boolean" },
      defaultValue: true,
      description: "Disable the gap property",
    },
    gap: {
      control: { type: "range", min: 0, max: 100 },
      description: "Gap between accordion items in px"
    }
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

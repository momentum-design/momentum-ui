import "@/components/label/Label";
import { html } from "lit-element";

export const labelTemplate = html`
  <md-label htmlFor="htmlId" label="Default Label"> </md-label>
  <md-label htmlFor="htmlId" label="Secondary label" secondaryLabel> </md-label>
  <md-label htmlFor="htmlId">
    <span>I am slotted content</span>
  </md-label>
  <md-label htmlFor="htmlId" label="I have both a label and a slotted content">
    <span>I am slotted content</span>
  </md-label>
`;

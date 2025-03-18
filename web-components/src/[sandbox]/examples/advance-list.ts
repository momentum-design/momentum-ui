import "@/components/list/ListItem";
import { html } from "lit-element";
import "./AdvanceList/components/ParentComponentError";
import "./AdvanceList/components/ParentComponentGeneric";
import "./AdvanceList/components/ParentComponentPreSelect";
import "./AdvanceList/components/ParentComponentWithMdOverlay";

export const advanceListTemplate = html`
  <div style="width: 300px">
    <parent-component-with-overlay></parent-component-with-overlay>
    <parent-component-generic></parent-component-generic>
    <parent-component-pre-select></parent-component-pre-select>
    <parent-component-error></parent-component-error>
    <parent-component-error .isNonSelectable=${true}></parent-component-error>
    <div class="empty-div" style="height: 200px"></div>
  </div>
`;

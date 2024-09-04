import "@/components/list/ListItem";
import "./AdvanceList/components/ParentComponentGeneric";
import "./AdvanceList/components/ParentComponentError";
import { html } from "lit-element";

export const advanceListTemplate = html`
 <div>
  <parent-component-generic></parent-component-generic>
  
  <parent-component-error></parent-component-error>

  </div>

  
`;


// <div style="width: 300px; margin-bottom: 50px"> 
// <parent-component-generic></parent-component-generic>
// </div>

//   <div style="width: 300px; margin-bottom: 50px"> 
// <parent-component-error></parent-component-error>
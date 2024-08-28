import "@/components/list/VirtualList";
import "@/components/list/ListItem";
import "./AdvanceList/components/ParentComponentGeneric";
import "./AdvanceList/components/ParentComponentError";
import { html } from "lit-element";

const data = [
    { id: "0", country: "Afghanistan" },
    { id: "1", country: "Aland Islands" },
    { id: "2", country: "Albania" },
    { id: "3", country: "Algeria" },
    { id: "4", country: "American Samoa" },
    { id: "5", country: "Andorra" }]




export const advanceListTemplate = html`
  <h3>VIRTUAL LIST</h3>

  <md-virtual-list ?virtual={true} .options=${data} label="Transuranium elements">
    
  </md-virtual-list>
  <parent-component-generic></parent-component-generic>
  
  <parent-component-error></parent-component-error>

  <div style="width: 300px; margin-bottom: 50px"> 
  <parent-component-generic></parent-component-generic>
  </div>

    <div style="width: 300px; margin-bottom: 50px"> 
  <parent-component-error></parent-component-error>
  </div>

  
`;


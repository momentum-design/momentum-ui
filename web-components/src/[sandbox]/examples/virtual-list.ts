import "@/components/list/VirtualList";
import "@/components/list/ListItem";
import "@/components/list/ParentComponent";
import { html } from "lit-element";

const data = [
    { id: "0", country: "Afghanistan" },
    { id: "1", country: "Aland Islands" },
    { id: "2", country: "Albania" },
    { id: "3", country: "Algeria" },
    { id: "4", country: "American Samoa" },
    { id: "5", country: "Andorra" }]




export const virtualListTemplate = html`
  <h3>VIRTUAL LIST</h3>

  <md-virtual-list ?virtual={true} .options=${data} label="Transuranium elements">
    
  </md-virtual-list>

  <parent-component></parent-component>
  
`;


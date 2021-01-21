import "@/components/draggable/DraggableItem";
import "@/components/draggable/DraggableWrap";
import { html } from "lit-element";

export const draggableTemplate = html`
  <h3>list 1</h3>
  <md-draggable-wrap>
    <md-draggable-item>A</md-draggable-item>
    <md-draggable-item>b</md-draggable-item>
    <md-draggable-item>C</md-draggable-item>
  </md-draggable-wrap>
  <h3>List 2</h3>
  <md-draggable-wrap>
  
  </md-draggable-wrap>
`;
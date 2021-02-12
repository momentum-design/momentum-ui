import "@/components/draggable/Draggable";
import "@/components/draggable/DraggableItem";
import "@/components/checkbox/Checkbox";
import "@/components/combobox/ComboBox";
import "@/components/icon/Icon";
import { css, customElement, html, LitElement } from "lit-element";

const draggableItemStyle = css`
  md-draggable-item {
    position: relative;
    display: block;
    padding: 0.5rem 1rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
    text-align: center;
  }

  .custom-ghost {
    background-color: #c8ebfb;
    border: 2px dashed #ddc74e;
  }
`;

@customElement("default-draggable-sandbox")
export class DefaultDraggable extends LitElement {
  static get styles() {
    return [
      css`
        ${draggableItemStyle}
      `
    ];
  }

  render() {
    return html`
      <md-draggable sort ghost-class="custom-ghost" chosen-class="custom-choose" draggable-items="md-draggable-item">
        <md-draggable-item slot="draggable-item">Sortable Item1</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item2</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item3</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item4</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item5</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item6</md-draggable-item>
        <md-draggable-item slot="draggable-item">Sortable Item7</md-draggable-item>
      </md-draggable>
    `;
  }
}

@customElement("not-sortable-draggable-sandbox")
export class NotSortableDraggable extends LitElement {
  static get styles() {
    return [
      css`
        ${draggableItemStyle}
      `
    ];
  }

  render() {
    return html`
      <md-draggable>
        <md-draggable-item slot="draggable-item">Not Sortable Item1</md-draggable-item>
        <md-draggable-item slot="draggable-item">Not Sortable Item2</md-draggable-item>
        <md-draggable-item slot="draggable-item">Not Sortable Item3</md-draggable-item>
        <md-draggable-item slot="draggable-item">Not Sortable Item4</md-draggable-item>
        <md-draggable-item slot="draggable-item">Not Sortable Item5</md-draggable-item>
        <md-draggable-item slot="draggable-item">Not Sortable Item6</md-draggable-item>
        <md-draggable-item slot="draggable-item">Not Sortable Item7</md-draggable-item>
      </md-draggable>
    `;
  }
}

export const draggableTemplate = html`
  <h3>Default Draggable List</h3>
  <default-draggable-sandbox></default-draggable-sandbox>
  <h3>Not Sortable Draggable List</h3>
  <not-sortable-draggable-sandbox></not-sortable-draggable-sandbox>
`;

import "@/components/draggable/Draggable";
import "@/components/draggable/DraggableItem";
import "@/components/checkbox/Checkbox";
import "@/components/combobox/ComboBox";
import "@/components/icon/Icon";
import "@/components/toggle-switch/ToggleSwitch";
import { customElement, LitElement, css, html } from "lit-element";

const draggableItemStyle = css`
  md-draggable-item {
    position: relative;
    display: block;
    text-align: center;
  }

  .shared-draggable-wrapper {
    display: flex;
    justify-content: space-around;
  }

  .custom-ghost {
    background-color: #c8ebfb;
    border: 2px dashed #ddc74e;
  }
`;

@customElement("default-draggable-sandbox")
export class DefaultDraggable extends LitElement {}

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
  <default-draggable-sandbox></default-draggable-sandbox>
`;

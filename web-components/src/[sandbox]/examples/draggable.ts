import "@/components/draggable/Draggable";
import "@/components/list/List";
import "@/components/list/ListItem";
import "@/components/checkbox/Checkbox";
import "@/components/checkbox/CheckboxGroup";
import "@/components/icon/Icon";
import reset from "@/wc_scss/reset.scss";
import { List } from "@/components/list/List";
import { ListItem } from "@/components/list/ListItem";
import { css, customElement, html, LitElement, query, queryAll } from "lit-element";
import Sortable, { GroupOptions } from "sortablejs";

@customElement("default-draggable-sandbox")
export class DefaultDraggable extends LitElement {
  @query("md-list") list!: List.ELEMENT;
  @queryAll("md-list-item") listItem!: ListItem.ELEMENT[];

  handleDragEnd(event: CustomEvent<{ srcEvent: Sortable.SortableEvent }>) {
    const {
      detail: {
        srcEvent: { newIndex, newDraggableIndex }
      }
    } = event;

    if (newIndex) {
      this.list.activated = newIndex;
      return false;
    }

    if (newDraggableIndex) {
      this.list.activated = newDraggableIndex;
      return false;
    }
  }

  handleDragMove(event: CustomEvent<{ srcEvent: Sortable.MoveEvent }>) {
    const {
      detail: {
        srcEvent: { dragged }
      }
    } = event;

    const draggedIndex = [...this.listItem].findIndex(listItem => listItem.isSameNode(dragged));

    if (draggedIndex !== -1) {
      this.list.activated = draggedIndex;
    }
  }

  static get styles() {
    return [
      reset,
      css`
      .sorting {
        opacity: 0.4;
        border-style: dashed;
        border-color: #333;
      }
    }`
    ];
  }

  render() {
    return html`
      <md-draggable
        draggable-items="md-list-item"
        @drag-end=${this.handleDragEnd}
        @drag-move=${this.handleDragMove}
        ghost-class="sorting"
      >
        <md-list label="Transuranium elements">
          <md-list-item slot="list-item">Neptunium</md-list-item>
          <md-list-item slot="list-item">Plutonium</md-list-item>
          <md-list-item slot="list-item">Americium</md-list-item>
          <md-list-item slot="list-item">Curium</md-list-item>
          <md-list-item slot="list-item">Berkelium</md-list-item>
          <md-list-item slot="list-item">Californium</md-list-item>
        </md-list>
      </md-draggable>
    `;
  }
}

@customElement("shared-draggable-sandbox")
export class SharedDraggable extends LitElement {
  static get styles() {
    return [
      reset,
      css`
      .shared-draggable-wrapper {
        display: flex;
        justify-content: space-evenly;
      }
      .ghost {
        opacity: 0.4;
        border-style: dashed;
        border-color: red;
        background-color: yellow;
      }
      md-checkbox[disabled] {
        background: red;
      }
    }`
    ];
  }

  render() {
    return html`
      <div class="shared-draggable-wrapper">
        <md-draggable
          draggable-items="md-checkbox"
          .group=${{ name: "checkbox-group", pull: "clone" } as GroupOptions}
          ghost-class="ghost"
          filter="md-checkbox[disabled]"
          handle="md-icon"
        >
          <md-checkboxgroup group-label="group_process">
            <md-checkbox slot="checkbox"><md-icon name="icon-drag_16"></md-icon>Left Option1</md-checkbox>
            <md-checkbox slot="checkbox" disabled><md-icon name="icon-drag_16"></md-icon>Left Option2</md-checkbox>
            <md-checkbox slot="checkbox"><md-icon name="icon-drag_16"></md-icon>Left Option3</md-checkbox>
            <md-checkbox slot="checkbox"><md-icon name="icon-drag_16"></md-icon>Left Option4</md-checkbox>
          </md-checkboxgroup>
        </md-draggable>
        <md-draggable
          draggable-items="md-checkbox"
          .group=${{ name: "checkbox-group", pull: "clone" } as GroupOptions}
          ghost-class="ghost"
          filter="md-checkbox[disabled]"
        >
          <md-checkboxgroup group-label="group_process">
            <md-checkbox slot="checkbox">Right Option1</md-checkbox>
            <md-checkbox slot="checkbox">Right Option2</md-checkbox>
            <md-checkbox slot="checkbox" disabled>Right Option3</md-checkbox>
            <md-checkbox slot="checkbox">Right Option4</md-checkbox>
          </md-checkboxgroup>
        </md-draggable>
      </div>
    `;
  }
}

export const draggableTemplate = html`
  <h3>Default</h3>
  <default-draggable-sandbox></default-draggable-sandbox>
  <h3>Shared</h3>
  <shared-draggable-sandbox></shared-draggable-sandbox>
`;
